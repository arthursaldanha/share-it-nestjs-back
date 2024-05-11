import { S3Client } from '@aws-sdk/client-s3';
import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers';
import { env } from '@/contexts/shared/infra/env';

export class CloudflareBucketProvider implements CloudflareBucket {
  bucketS3Client: S3Client;

  constructor() {
    this.bucketS3Client = new S3Client({
      region: 'auto',
      endpoint: env.CLOUDFLARE_ENDPOINT,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    });
  }

  async createPreSignedUrl(
    uploadFile: UploadFile,
    expiresIn: number = 600,
  ): Promise<string> {
    try {
      const signedUrl = await getSignedUrl(
        this.bucketS3Client,
        new PutObjectCommand({
          Bucket: 'drop-it-hml',
          Key: uploadFile.key,
          ContentType: uploadFile.contentType.getValue(),
        }),
        { expiresIn },
      );

      return signedUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível criar a URL de upload');
    }
  }

  async getPreSignedUrl(uploadFile: UploadFile): Promise<string> {
    try {
      const signedUrl = await getSignedUrl(
        this.bucketS3Client,
        new GetObjectCommand({
          Bucket: 'drop-it-hml',
          Key: uploadFile.key,
        }),
        { expiresIn: 600 },
      );

      return signedUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter a URL de upload');
    }
  }

  async removeFile(uploadFile: UploadFile): Promise<void> {
    try {
      await this.bucketS3Client.send(
        new DeleteObjectCommand({
          Bucket: 'drop-it-hml',
          Key: uploadFile.key,
        }),
      );
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível remover o arquivo do Bucket');
    }
  }
}
