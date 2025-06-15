import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserProfile } from 'core/domain/models/user-profile';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserProfile => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserProfile;
});
