import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';
import { FileRepository } from '@/contexts/bucket/domain/upload/file-repository';
import { MySqlClient } from '@/contexts/bucket/infra/adapters/mysql';

export class MySqlFilesRepository implements FileRepository {
  constructor(private readonly mySqlClient: MySqlClient) { }

  async save(uploadFile: UploadFile): Promise<void> {
    try {
      await this.mySqlClient.connection.file.create({
        data: {
          id: uploadFile.id,
          key: uploadFile.key,
          contentType: uploadFile.contentType.getValue(),
          name: uploadFile.name.getValue(),
          createdAt: uploadFile.createdAt.toISOString(),
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível salvar o arquivo na base de dados');
    }
  }

  async getById(id: string): Promise<UploadFile | null> {
    try {
      const uploadedFile = await this.mySqlClient.connection.file.findFirst({
        where: { id },
      });

      if (!uploadedFile) return null;

      return UploadFile.restore(
        uploadedFile.id,
        uploadedFile.key,
        uploadedFile.contentType,
        uploadedFile.name,
        uploadedFile.createdAt,
      );
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter o arquivo');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.mySqlClient.connection.file.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível remover o arquivo');
    }
  }
}
