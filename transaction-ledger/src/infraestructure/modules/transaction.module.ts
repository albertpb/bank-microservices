import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionOrmEntity } from 'infraestructure/persistence/entities/transaction.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionOrmEntity])],
})
export class TransactionModule {}
