import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  get(): string {
    return 'Ok';
  }

  @Get('health')
  health(): string {
    return 'Ok';
  }
}
