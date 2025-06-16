import { Module } from '@nestjs/common';
import { HandleTransferUseCase } from 'core/application/use-cases/handle-transfer.use-case';
import { KafkaConsumer } from 'infraestructure/kafka/consumer';

@Module({
  providers: [KafkaConsumer, HandleTransferUseCase],
})
export class KafkaModule {}
