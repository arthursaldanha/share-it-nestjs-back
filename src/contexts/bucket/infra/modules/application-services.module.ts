import { Module } from '@nestjs/common';

import { ioc } from '@/contexts/shared/infra/ioc';

import { ProvidersModule } from './providers.module';
import { RepositoriesModule } from './repositories.module';

import {
  CreatePreSignedUrlService,
  GetPreSignedUrlService,
  ScheduleCleanUpUploadService,
} from '@/contexts/bucket/application/services';

@Module({
  imports: [ProvidersModule, RepositoriesModule],
  providers: [
    {
      provide: ioc.application.services.createPreSignedUrl,
      useFactory: (filesRepository, cloudflareBucket) =>
        new CreatePreSignedUrlService(filesRepository, cloudflareBucket),
      inject: [
        ioc.infrastructure.repositories.filesRepository,
        ioc.infrastructure.providers.cloudflareBucket,
      ],
    },
    {
      provide: ioc.application.services.getPreSignedUrl,
      useFactory: (filesRepository, cloudflareBucket) =>
        new GetPreSignedUrlService(filesRepository, cloudflareBucket),
      inject: [
        ioc.infrastructure.repositories.filesRepository,
        ioc.infrastructure.providers.cloudflareBucket,
      ],
    },
    {
      provide: ioc.application.services.scheduleCleanupUpload,
      useFactory: (filesRepository, cloudflareBucket) =>
        new ScheduleCleanUpUploadService(filesRepository, cloudflareBucket),
      inject: [
        ioc.infrastructure.repositories.filesRepository,
        ioc.infrastructure.providers.cloudflareBucket,
      ],
    },
  ],
  exports: [
    ioc.application.services.createPreSignedUrl,
    ioc.application.services.getPreSignedUrl,
    ioc.application.services.scheduleCleanupUpload,
  ],
})
export class ApplicationServicesModule { }
