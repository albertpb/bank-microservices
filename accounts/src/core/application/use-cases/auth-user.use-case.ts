import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_REPOSITORY, UserRepositoryPort } from '../ports/out/user-repository.port';
import { JwtService } from '@nestjs/jwt';
import { BcryptAdapter } from 'infraestructure/adapters/bcrypt.adapter';

@Injectable()
export class AuthUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort,
    private readonly jwtService: JwtService,
    private readonly hasher: BcryptAdapter,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await user.isPasswordMatch(password, this.hasher);
    if (!valid) throw new UnauthorizedException();

    return this.jwtService.sign({ sub: user.id, email: user.email });
  }
}
