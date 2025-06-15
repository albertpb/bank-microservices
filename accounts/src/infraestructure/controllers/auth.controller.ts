import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../../core/application/dto/user.dto';
import { AuthUserUseCase } from '../../core/application/use-cases/auth-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}

  @Post('login')
  async login(@Body() user: UserDto) {
    const token = await this.authUserUseCase.execute(user.email, user.password);
    return { accessToken: token };
  }
}
