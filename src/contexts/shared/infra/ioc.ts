export const ioc = {
  application: {
    services: {
      createPreSignedUrl: Symbol('CreatePreSignedUrlService'),
      getPreSignedUrl: Symbol('GetPreSignedUrlService'),
      scheduleCleanupUpload: Symbol('ScheduleCleanupUploadService'),
    },
  },
  domain: {},
  infrastructure: {
    environment: {
      databaseUrl: Symbol.for('DatabaseUrl'),
    },
    adapters: {
      mySqlClient: Symbol.for('MySqlClient'),
      axiosHttpClient: Symbol.for('AxiosHttpClient'),
      logger: Symbol.for('Logger'),
    },
    providers: {
      cloudflareBucket: Symbol.for('CloudflareBucketProvider'),
    },
    repositories: {
      filesRepository: Symbol.for('FilesRepository'),
    },
  },
};
