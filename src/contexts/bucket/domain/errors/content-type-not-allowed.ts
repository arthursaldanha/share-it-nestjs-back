import { ErrorCode } from '@/contexts/bucket/domain/errors/errors-code';
import { OperationalError } from '@/contexts/bucket/domain/errors/operational-error';

export class ContentTypeNotAllowedError extends OperationalError {
  constructor(contentType: string) {
    super(
      `Não é possível armazenar arquivos com este formato: ${contentType}.`,
      ErrorCode.CONTENT_TYPE_NOT_ALLOWED,
    );
  }
}
