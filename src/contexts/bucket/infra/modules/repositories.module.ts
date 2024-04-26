import { Module } from '@nestjs/common';

import { ioc } from '@/contexts/shared/infra/ioc';
import { MySqlFilesRepository } from '@/contexts/bucket/infra/mysql-bucket-repository';

import { AdaptersModule } from './adapters.module';

@Module({
  imports: [AdaptersModule],
  providers: [
    {
      provide: ioc.infrastructure.repositories.filesRepository,
      useFactory: (mySqlClient) => new MySqlFilesRepository(mySqlClient),
      inject: [ioc.infrastructure.adapters.mySqlClient],
    },
  ],
  exports: [ioc.infrastructure.repositories.filesRepository],
})
export class RepositoriesModule { }
