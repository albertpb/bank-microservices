import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Request as ExpressRequest } from 'express';
import { GetUserProfileUseCase } from 'core/application/use-cases/user-profile.use-case';

@Controller('users')
export class UserController {
  constructor(private readonly userProfileUseCase: GetUserProfileUseCase) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: ExpressRequest) {
    if (req.user && req.user.userId) {
      return await this.userProfileUseCase.getUserById(req.user.userId);
    }
    throw new Error('User not authenticated or userId not found in request');
  }
}
