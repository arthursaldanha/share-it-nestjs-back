import { ErrorCode } from '@/contexts/bucket/domain/errors/errors-code';
import { OperationalError } from '@/contexts/bucket/domain/errors/operational-error';

export class FileNotFoundError extends OperationalError {
  constructor(id: string) {
    super(
      `Não foi encontrado arquivos com este ID: ${id}`,
      ErrorCode.FILE_NOT_FOUND,
    );
  }
}
