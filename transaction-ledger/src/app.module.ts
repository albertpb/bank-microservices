import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'infraestructure/modules/kafka.module';
import { OutboxTransactionsDbModule } from 'infraestructure/modules/outbox-transactions-db.module';
import { TransactionModule } from 'infraestructure/modules/transaction.module';
import { TransactionsDbModule } from 'infraestructure/modules/transactions-db.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    TransactionsDbModule,
    OutboxTransactionsDbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    KafkaModule,
    TransactionModule,
  ],
})
export class AppModule {}
