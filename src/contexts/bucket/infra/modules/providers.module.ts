import { Module } from '@nestjs/common';

import { ioc } from '@/contexts/shared/infra/ioc';
import { CloudflareBucketProvider } from '@/contexts/bucket/infra/providers';

@Module({
  providers: [
    {
      provide: ioc.infrastructure.providers.cloudflareBucket,
      useFactory: () => new CloudflareBucketProvider(),
    },
  ],
  exports: [ioc.infrastructure.providers.cloudflareBucket],
})
export class ProvidersModule { }
