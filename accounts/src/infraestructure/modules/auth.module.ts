import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthController } from 'infraestructure/controllers/auth.controller';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { BcryptAdapter } from 'infraestructure/adapters/bcrypt.adapter';
import { JwtStrategy } from 'infraestructure/auth/jwt.strategy';
import { AuthUserUseCase } from 'core/application/use-cases/auth-user.use-case';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
        },
      }),
    }),
    PassportModule,
    UserModule,
  ],
  exports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthUserUseCase, JwtStrategy, BcryptAdapter],
})
export class AuthModule {}
