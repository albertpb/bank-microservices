import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('OUTBOX_TRANSACTIONS_DB_HOST'),
        port: config.get<number>('OUTBOX_TRANSACTIONS_DB_PORT') || 5432,
        username: config.get<string>('OUTBOX_TRANSACTIONS_DB_USERNAME'),
        password: config.get<string>('OUTBOX_TRANSACTIONS_DB_PASSWORD'),
        database: config.get<string>('OUTBOX_TRANSACTIONS_DB_NAME'),
        entities: [__dirname + '/../**/*.orm-entity.{ts,js}'],
        synchronize: config.get<string>('NODE_ENV') !== 'production',
      }),
    }),
  ],
})
export class OutboxTransactionsDbModule {}
