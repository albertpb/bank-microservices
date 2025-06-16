export enum ProductAuthorizationState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export class ProductAuthorizationEvent {
  constructor(
    public readonly productId: string,
    public readonly toId: string,
    public readonly fromId: string,
    public readonly state: ProductAuthorizationState,
    public readonly amount: number,
    public readonly createdAt: Date = new Date(),
  ) {}
}
