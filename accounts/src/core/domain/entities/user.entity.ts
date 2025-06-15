import { Exclude, Expose } from 'class-transformer';
import { Email } from '../vo/email.vo';

export class UserEntity {
  @Expose()
  id: string;

  @Expose()
  name: string;

  email: Email;

  @Exclude()
  passwordHash: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  async isPasswordMatch(
    raw: string,
    adapter: { compare: (raw: string, hash: string) => Promise<boolean> },
  ) {
    return adapter.compare(raw, this.passwordHash);
  }

  getPasswordHash() {
    return this.passwordHash;
  }
}
