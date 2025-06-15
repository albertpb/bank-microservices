import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  PRODUCT_AUTHORIZATION_PORT,
  ProductAuthorizationPort,
} from '../ports/in/product-authorizaton.port';
import { EVENT_PRODUCER_PORT, EventProducerPort } from '../ports/out/event-producer.port';
import {
  ProductAuthorizationEntity,
  ProductAuthorizationState,
} from 'core/domain/entities/product-authorization';

@Injectable()
export class AuthorizeProductAuthorizationUseCase {
  constructor(
    private readonly configService: ConfigService,
    @Inject(PRODUCT_AUTHORIZATION_PORT)
    private readonly productAuthorizationPort: ProductAuthorizationPort,
    @Inject(EVENT_PRODUCER_PORT)
    private readonly eventProducer: EventProducerPort,
  ) {}

  async execute(productAuthorizationId: string): Promise<ProductAuthorizationEntity> {
    const productAuthorization =
      await this.productAuthorizationPort.findById(productAuthorizationId);

    if (!productAuthorization) {
      throw new Error(`Product authorization with ID ${productAuthorizationId} not found`);
    }

    if (productAuthorization.state !== ProductAuthorizationState.PENDING) {
      throw new Error(
        `Product authorization with ID ${productAuthorizationId} is not in PENDING state`,
      );
    }

    const topic = this.configService.get<string>('KAFKA_TOPIC');

    if (!topic) {
      throw new Error('KAFKA_TOPIC is not defined in the configuration');
    }

    await this.productAuthorizationPort.authorize(productAuthorizationId);

    await this.eventProducer.send(topic, [
      {
        key: productAuthorization.id,
        value: JSON.stringify(productAuthorization),
      },
    ]);

    return productAuthorization;
  }
}
