import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('outbox_transactions')
export class OutboxTransactionOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  toId: string;

  @Column()
  fromId: string;

  @Column()
  amount: number;

  @Column()
  createdAt: Date;
}
