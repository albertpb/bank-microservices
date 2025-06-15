import { UserEntity } from '../../domain/entities/user.entity';

export class UserResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}

  static fromEntity(user: UserEntity): UserResponseDto {
    return new UserResponseDto(user.id, user.name, user.email.getValue());
  }
}
