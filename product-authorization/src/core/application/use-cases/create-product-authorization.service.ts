import { Inject, Injectable } from '@nestjs/common';
import {
  PRODUCT_AUTHORIZATION_PORT,
  ProductAuthorizationPort,
} from '../ports/in/product-authorizaton.port';
import { randomUUID } from 'crypto';
import {
  ProductAuthorizationEntity,
  ProductAuthorizationState,
} from 'core/domain/entities/product-authorization';

@Injectable()
export class CreateProductAuthorizationUseCase {
  constructor(
    @Inject(PRODUCT_AUTHORIZATION_PORT)
    private readonly productAuthorizationPort: ProductAuthorizationPort,
  ) {}

  async execute(
    fromId: string,
    toId: string,
    productId: string,
    amount: number,
  ): Promise<ProductAuthorizationEntity> {
    const productAuthorization = {
      id: randomUUID() as string,
      fromId,
      toId,
      productId,
      createdAt: new Date(),
      updatedAt: new Date(),
      amount,
      state: ProductAuthorizationState.PENDING,
    };

    await this.productAuthorizationPort.create(productAuthorization);

    return productAuthorization;
  }
}
