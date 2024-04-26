import { mock } from 'jest-mock-extended';
import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';

export const fileRepositoryStub = mock<FileRepository>({
  save: () => Promise.resolve(),
  getById: () =>
    Promise.resolve(UploadFile.create('valid_name', 'application/pdf')),
  remove: () => Promise.resolve(),
});
