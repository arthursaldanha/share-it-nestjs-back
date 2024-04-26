import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers/clouflare-bucket';

import { GetPreSignedUrlRequestDTO } from '@/contexts/bucket/application/dtos';
import { FileNotFoundError } from '@/contexts/bucket/domain/errors/file-not-found';

export class GetPreSignedUrlService {
  constructor(
    private readonly filesRepository: FileRepository,
    private readonly cloudflareBucketProvider: CloudflareBucket,
  ) { }

  async execute({ id }: GetPreSignedUrlRequestDTO) {
    try {
      const file = await this.filesRepository.getById(id);

      if (!file) {
        throw new FileNotFoundError(id);
      }

      const signedUrl =
        await this.cloudflareBucketProvider.getPreSignedUrl(file);

      return { signedUrl };
    } catch (error) {
      throw error;
    }
  }
}
