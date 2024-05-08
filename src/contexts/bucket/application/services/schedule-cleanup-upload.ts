import { Cron, CronExpression } from '@nestjs/schedule';

import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers/clouflare-bucket';

export class ScheduleCleanUpUploadService {
  TIME_IN_MINUTES: number = 30;

  constructor(
    private readonly filesRepository: FileRepository,
    private readonly cloudflareBucketProvider: CloudflareBucket,
  ) { }

  async cleanupImages() {
    try {
      const thresholdTime = this.calculateThresholdTime();

      const uploads =
        await this.filesRepository.getOldUploadsByCreatedAt(thresholdTime);

      if (!uploads) return;

      for (const upload of uploads) {
        await this.cloudflareBucketProvider.removeFile(upload);
        await this.filesRepository.remove(upload.id);

        console.log('arq removido :>> ', { id: upload.id, key: upload.key });
      }
    } catch (error) {
      throw error;
    }
  }

  private calculateThresholdTime(): Date {
    const time = new Date();

    time.setMinutes(time.getMinutes() - this.TIME_IN_MINUTES);

    return time;
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async execute() {
    this.cleanupImages();
  }
}
