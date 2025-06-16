import { Injectable } from '@nestjs/common';
import { TransactionEntity } from 'core/domain/entities/transaction.entity';
import { TransactionOrmEntity } from './entities/transaction.orm-entity';

@Injectable()
export class TransactionRepository {
  constructor() {}

  async create(transaction: TransactionEntity) {}

  toOrmEntity(transaction: TransactionEntity): TransactionOrmEntity {
    return {
      id: transaction.id,
      productId: transaction.productId,
      toId: transaction.toId,
      fromId: transaction.fromId,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
    };
  }
}
