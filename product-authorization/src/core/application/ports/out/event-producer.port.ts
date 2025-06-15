import { Message } from 'kafkajs';

export interface EventProducerPort {
  send(topic: string, messages: Message[]): Promise<void>;
}

export const EVENT_PRODUCER_PORT = Symbol('EVENT_PRODUCER_PORT');
