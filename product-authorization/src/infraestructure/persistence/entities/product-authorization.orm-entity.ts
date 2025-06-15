import { ProductAuthorizationState } from 'core/domain/entities/product-authorization';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('product_authorizations')
export class ProductAuthorizationOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  fromId: string;

  @Column()
  toId: string;

  @Column()
  productId: string;

  @Column({ type: 'int' })
  amount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: ProductAuthorizationState,
    default: ProductAuthorizationState.PENDING,
  })
  state: ProductAuthorizationState;
}
