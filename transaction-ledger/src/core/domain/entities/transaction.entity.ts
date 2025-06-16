export class TransactionEntity {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly toId: string,
    public readonly fromId: string,
    public readonly amount: number,
    public readonly createdAt: Date = new Date(),
  ) {}
}
