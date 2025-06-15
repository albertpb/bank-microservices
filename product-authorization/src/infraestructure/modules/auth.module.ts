import { Global, Module } from '@nestjs/common';
import { USER_PROFILE } from 'core/application/ports/out/user-profile.port';
import { AuthMicroserviceAdapter } from 'infraestructure/adapters/out/auth-microservice.adapter';

@Global()
@Module({
  providers: [
    AuthMicroserviceAdapter,
    {
      provide: USER_PROFILE,
      useClass: AuthMicroserviceAdapter,
    },
  ],
  exports: [USER_PROFILE],
})
export class AuthModule {}
