import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('/health')
export class HealthController {
  @Get()
  @ApiExcludeEndpoint()
  getHealth() {
    return { status: 'OK' };
  }
}
