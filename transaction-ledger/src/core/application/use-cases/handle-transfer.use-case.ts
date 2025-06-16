import { Injectable } from '@nestjs/common';
import { ProductAuthorizationEvent } from 'core/domain/events/product-authorization.event';
import { Logger } from 'nestjs-pino';

@Injectable()
export class HandleTransferUseCase {
  constructor(private readonly logger: Logger) {}

  async execute(event: ProductAuthorizationEvent): Promise<void> {
    this.logger.log(
      `Handling transfer for product ${event.productId} from ${event.fromId} to ${event.toId} with state ${event.state}`,
    );
  }
}
