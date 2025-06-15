import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GetUserProfilePort, USER_PROFILE } from 'core/application/ports/out/user-profile.port';

@Injectable()
export class AuthGuard {
  constructor(@Inject(USER_PROFILE) private readonly authClient: GetUserProfilePort) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const token = authHeader?.split(' ')[1];
      if (!token || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Missing or invalid Authorization header');
      }

      const userProfile = await this.authClient.getProfileFromToken(token);
      request.user = userProfile;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
