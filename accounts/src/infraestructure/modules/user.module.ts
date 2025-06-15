import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../persistence/entities/user.orm-entity';
import { UserRepository } from '../persistence/user.repository';
import { USER_REPOSITORY } from '../../core/application/ports/out/user-repository.port';
import { UserController } from 'infraestructure/controllers/user.controller';
import { GetUserProfileUseCase } from 'core/application/use-cases/user-profile.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    GetUserProfileUseCase,
  ],
  controllers: [UserController],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
