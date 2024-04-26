import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';
import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers/clouflare-bucket';

import { CreatePreSignedUrlRequestDTO } from '@/contexts/bucket/application/dtos';

export class CreatePreSignedUrlService {
  constructor(
    private readonly filesRepository: FileRepository,
    private readonly cloudflareBucketProvider: CloudflareBucket,
  ) { }

  async execute({ name, contentType }: CreatePreSignedUrlRequestDTO) {
    try {
      const uploadFile = UploadFile.create(name, contentType);

      const signedUrl =
        await this.cloudflareBucketProvider.createPreSignedUrl(uploadFile);

      await this.filesRepository.save(uploadFile);

      const { id } = uploadFile.toJSON();

      return { signedUrl, id };
    } catch (error) {
      throw error;
    }
  }
}
