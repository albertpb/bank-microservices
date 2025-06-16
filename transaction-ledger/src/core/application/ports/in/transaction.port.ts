import { TransactionEntity } from 'core/domain/entities/transaction.entity';

export interface TransactionPort {
  create(transaction: TransactionEntity): Promise<void>;
}

export const TRANSACTION_PORT = Symbol('TRANSACTION_PORT');
