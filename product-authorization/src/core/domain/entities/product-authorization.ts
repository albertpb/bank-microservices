export enum ProductAuthorizationState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export class ProductAuthorizationEntity {
  constructor(
    public readonly id: string,
    public readonly fromId: string,
    public readonly toId: string,
    public readonly productId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly amount: number,
    public readonly state: ProductAuthorizationState = ProductAuthorizationState.PENDING,
  ) {}
}
