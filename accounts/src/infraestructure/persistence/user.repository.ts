import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from '../../core/application/ports/out/user-repository.port';
import { UserOrmEntity } from './entities/user.orm-entity';
import { UserEntity } from '../../core/domain/entities/user.entity';
import { Email } from '../../core/domain/vo/email.vo';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    const ormUser = this.toOrmEntity(user);
    await this.userRepository.save(ormUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const ormUser = await this.userRepository.findOne({ where: { id } });
    return ormUser ? this.toDomainEntity(ormUser) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const ormUser = await this.userRepository.findOne({ where: { email } });
    return ormUser ? this.toDomainEntity(ormUser) : null;
  }

  private toOrmEntity(user: UserEntity): UserOrmEntity {
    return {
      id: user.id,
      name: user.name,
      email: user.email.getValue(),
      hashed_password: user.getPasswordHash(),
    };
  }

  private toDomainEntity(orm: UserOrmEntity): UserEntity {
    return new UserEntity({
      id: orm.id,
      name: orm.name,
      email: new Email(orm.email),
      passwordHash: orm.hashed_password,
    });
  }
}
