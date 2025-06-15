import { InjectRepository } from '@nestjs/typeorm';
import { ProductAuthorizationPort } from 'core/application/ports/in/product-authorizaton.port';
import { ProductAuthorizationOrmEntity } from './entities/product-authorization.orm-entity';
import { Repository } from 'typeorm';
import {
  ProductAuthorizationEntity,
  ProductAuthorizationState,
} from 'core/domain/entities/product-authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductAuthorizationRepository implements ProductAuthorizationPort {
  constructor(
    @InjectRepository(ProductAuthorizationOrmEntity)
    private readonly productAuthorizationRepository: Repository<ProductAuthorizationOrmEntity>,
  ) {}

  async findById(id: string): Promise<ProductAuthorizationEntity | null> {
    const productAuthorization = await this.productAuthorizationRepository.findOne({
      where: { id },
    });

    if (!productAuthorization) {
      return null;
    }

    return this.toDomainEntity(productAuthorization);
  }

  async create(productAuthorization: ProductAuthorizationEntity): Promise<void> {
    const ormProductAuthorization = this.toOrmEntity(productAuthorization);
    await this.productAuthorizationRepository.save(ormProductAuthorization);
  }

  async authorize(id: string): Promise<void> {
    await this.productAuthorizationRepository.update(id, {
      state: ProductAuthorizationState.ACCEPTED,
      updatedAt: new Date(),
    });
  }

  async reject(id: string): Promise<void> {
    await this.productAuthorizationRepository.update(id, {
      state: ProductAuthorizationState.REJECTED,
      updatedAt: new Date(),
    });
  }

  private toOrmEntity(
    productAuthorization: ProductAuthorizationEntity,
  ): ProductAuthorizationOrmEntity {
    return {
      id: productAuthorization.id,
      fromId: productAuthorization.fromId,
      toId: productAuthorization.toId,
      createdAt: productAuthorization.createdAt,
      updatedAt: productAuthorization.updatedAt,
      amount: productAuthorization.amount,
      state: productAuthorization.state,
      productId: productAuthorization.productId,
    };
  }

  private toDomainEntity(ormEntity: ProductAuthorizationOrmEntity): ProductAuthorizationEntity {
    return new ProductAuthorizationEntity(
      ormEntity.id,
      ormEntity.fromId,
      ormEntity.toId,
      ormEntity.productId,
      ormEntity.createdAt,
      ormEntity.updatedAt,
      ormEntity.amount,
      ormEntity.state,
    );
  }
}
