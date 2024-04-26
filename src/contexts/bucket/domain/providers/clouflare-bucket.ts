import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';

export interface CloudflareBucket {
  createPreSignedUrl(
    uploadFile: UploadFile,
    expiresIn?: number,
  ): Promise<string>;
  getPreSignedUrl(uploadFile: UploadFile): Promise<string>;
}
