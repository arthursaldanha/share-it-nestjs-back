import { Module } from '@nestjs/common';

import { EnvironmentModule } from '@/contexts/bucket/infra/modules/environment.module';
import { AdaptersModule } from '@/contexts/bucket/infra/modules/adapters.module';
import { ProvidersModule } from '@/contexts/bucket/infra/modules/providers.module';
import { RepositoriesModule } from '@/contexts/bucket/infra/modules/repositories.module';
import { ApplicationServicesModule } from '@/contexts/bucket/infra/modules/application-services.module';

import { FilesController } from '@/contexts/bucket/application/controllers';

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    AdaptersModule,
    ProvidersModule,
    RepositoriesModule,
    ApplicationServicesModule,
  ],
  controllers: [FilesController],
})
export class FilesModule { }
