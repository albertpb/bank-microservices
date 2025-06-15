import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepositoryPort } from '../ports/out/user-repository.port';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class GetUserProfileUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort) {}

  async getUserById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      return null;
    }
    return UserResponseDto.fromEntity(user);
  }
}
