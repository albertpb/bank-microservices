import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Message, Producer } from 'kafkajs';

@Injectable()
export class KafkaClient implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'PRODUCT_AUTHORIZATION_PRODUCER',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  private producer: Producer;

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async onModuleDestroy() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }

  async send(topic: string, messages: Message[]): Promise<void> {
    await this.producer.send({
      topic,
      messages,
    });
  }
}
