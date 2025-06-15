export class Email {
  constructor(private readonly value: string) {
    if (!value.match(/^\S+@\S+\.\S+$/)) {
      throw new Error('Invalid email');
    }
  }

  getValue(): string {
    return this.value;
  }
}
