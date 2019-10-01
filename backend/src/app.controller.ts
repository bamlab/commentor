import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  health(): object {
    // https://tools.ietf.org/id/draft-inadarei-api-health-check-01.html#rfc.section.3
    return { status: 'pass' };
  }
}
