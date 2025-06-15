import { Module } from '@nestjs/common';
import { EVENT_PRODUCER_PORT } from 'core/application/ports/out/event-producer.port';
import { KafkaClient } from 'infraestructure/events/kafka-client';
import { KafkaEventProducerService } from 'infraestructure/events/kafka-event-producer.service';

@Module({
  providers: [
    KafkaClient,
    KafkaEventProducerService,
    {
      provide: EVENT_PRODUCER_PORT,
      useClass: KafkaEventProducerService,
    },
  ],
  exports: [EVENT_PRODUCER_PORT],
})
export class KafkaModule {}
