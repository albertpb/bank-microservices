import { UserProfile } from '../../../domain/models/user-profile';

export interface GetUserProfilePort {
  getProfileFromToken(token: string): Promise<UserProfile>;
}

export const USER_PROFILE = Symbol('USER_PROFILE');
