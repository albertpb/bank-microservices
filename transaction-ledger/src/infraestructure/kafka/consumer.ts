import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandleTransferUseCase } from 'core/application/use-cases/handle-transfer.use-case';
import { ProductAuthorizationEvent } from 'core/domain/events/product-authorization.event';
import { Kafka, EachMessagePayload } from 'kafkajs';
import { Logger } from 'nestjs-pino';

@Injectable()
export class KafkaConsumer implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
    private readonly handleTransferUseCase: HandleTransferUseCase,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing Kafka consumer...');

    const kafka = new Kafka({
      clientId: 'PRODUCT_AUTHORIZATION_CONSUMER',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    const groupId = this.configService.get<string>('KAFKA_GROUP_ID');

    if (!groupId) {
      throw new Error('KAFKA_GROUP_ID is not defined in the configuration');
    }

    this.logger.log(`Connecting to Kafka broker with group ID: ${groupId}`);

    const consumer = kafka.consumer({
      groupId,
    });

    await consumer.connect();
    await consumer.subscribe({
      topic: 'product_authorizations',
    });

    this.logger.log('Kafka consumer connected and subscribed to topic "product_authorizations"');

    await consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const data = JSON.parse(message.value?.toString() || '{}');
        const event = new ProductAuthorizationEvent(
          data.productId,
          data.toId,
          data.fromId,
          data.state,
          data.amount,
          new Date(data.createdAt),
        );
        await this.handleTransferUseCase.execute(event);
      },
    });

    this.logger.log('Kafka consumer is running and listening for messages');
  }
}
