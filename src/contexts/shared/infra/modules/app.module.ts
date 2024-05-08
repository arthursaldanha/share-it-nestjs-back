import crypto from 'crypto';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from 'nestjs-pino';
import { HealthController } from '@/contexts/shared/application/controllers/health';
import { FilesModule } from '@/contexts/bucket/infra/modules/files.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        genReqId: () => crypto.randomUUID(),
        autoLogging: false,
      },
    }),
    ScheduleModule.forRoot(),
    FilesModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
