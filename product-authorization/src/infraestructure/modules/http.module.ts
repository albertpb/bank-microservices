import { Global, Module } from '@nestjs/common';
import { AxiosHttpClientService } from '../adapters/axios-http-client.service';
import { HTTP_CLIENT } from 'core/application/ports/out/http-client.port';

@Global()
@Module({
  providers: [
    AxiosHttpClientService,
    {
      provide: HTTP_CLIENT,
      useClass: AxiosHttpClientService,
    },
  ],
  exports: [HTTP_CLIENT],
})
export class HttpModule {}
