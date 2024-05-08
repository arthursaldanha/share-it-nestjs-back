import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';

export interface FileRepository {
  save(uploadFile: UploadFile): Promise<void>;
  getById(id: string): Promise<UploadFile | null>;
  getOldUploadsByCreatedAt(dateToFilter: Date): Promise<UploadFile[] | null>;
  remove(id: string): Promise<void>;
}
