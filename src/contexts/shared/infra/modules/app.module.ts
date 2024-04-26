import crypto from 'crypto';
import { Module } from '@nestjs/common';
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
    FilesModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
