import { Injectable } from '@nestjs/common';
import { EventProducerPort } from 'core/application/ports/out/event-producer.port';
import { Message } from 'kafkajs';
import { KafkaClient } from './kafka-client';

@Injectable()
export class KafkaEventProducerService implements EventProducerPort {
  constructor(private readonly kafka: KafkaClient) {}

  async send(topic: string, messages: Message[]): Promise<void> {
    await this.kafka.send(topic, messages);
  }
}
