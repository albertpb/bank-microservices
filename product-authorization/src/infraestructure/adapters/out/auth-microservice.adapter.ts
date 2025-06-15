import { Inject, Injectable } from '@nestjs/common';
import { GetUserProfilePort } from 'core/application/ports/out/user-profile.port';
import { UserProfile } from 'core/domain/models/user-profile';
import { AxiosHttpClientService } from '../axios-http-client.service';
import { ConfigService } from '@nestjs/config';
import { HTTP_CLIENT } from 'core/application/ports/out/http-client.port';

@Injectable()
export class AuthMicroserviceAdapter implements GetUserProfilePort {
  constructor(
    @Inject(HTTP_CLIENT) private readonly httpClient: AxiosHttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async getProfileFromToken(token: string): Promise<UserProfile> {
    const authServiceUrl = this.configService.get<string>('ACCOUNTS_URL');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const url = `${authServiceUrl}/users/profile`;
    try {
      const response = await this.httpClient.get<UserProfile>(url, { headers });
      if (!response.id) {
        throw new Error('User profile not found');
      }

      return response;
    } catch (error: any) {
      throw new Error(`Failed to fetch user profile: ${error.message}`);
    }
  }
}
