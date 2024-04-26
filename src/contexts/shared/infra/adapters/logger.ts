import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AppLogger {
  constructor(
    @InjectPinoLogger()
    private readonly logger: PinoLogger,
  ) {}

  getLoggerInstance(context: string) {
    this.logger.setContext(context);
    return this.logger;
  }
}
