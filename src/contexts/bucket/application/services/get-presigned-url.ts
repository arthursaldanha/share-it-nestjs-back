import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers/clouflare-bucket';

import { FileNotFoundError } from '@/contexts/bucket/domain/errors/file-not-found';

export class GetPreSignedUrlService {
  TIME_IN_MINUTES: number = 30;

  constructor(
    private readonly filesRepository: FileRepository,
    private readonly cloudflareBucketProvider: CloudflareBucket,
  ) { }

  async execute(id: string) {
    try {
      const file = await this.filesRepository.getById(id);

      if (!file || this.isFileStale(file.createdAt)) {
        throw new FileNotFoundError(id);
      }

      const signedUrl =
        await this.cloudflareBucketProvider.getPreSignedUrl(file);

      return { signedUrl };
    } catch (error) {
      throw error;
    }
  }

  private isFileStale(createdAt: Date): boolean {
    const thresholdTime = new Date();

    thresholdTime.setMinutes(thresholdTime.getMinutes() - this.TIME_IN_MINUTES);

    return createdAt < thresholdTime;
  }
}
