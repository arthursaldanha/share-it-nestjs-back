import { ContentTypeNotAllowedError } from '@/contexts/bucket/domain/errors';

export class ContentType {
  private contentType: string;

  constructor(contentType: string) {
    if (!contentType || contentType.trim() === '') {
      throw new Error('ContentType é obrigatório.');
    }

    if (!this.validateContentType(contentType)) {
      throw new ContentTypeNotAllowedError(contentType);
    }

    this.contentType = contentType;
  }

  private validateContentType(contentType: string): boolean {
    const allowedFormats = ['pdf', 'jpeg', 'png'];
    const contentTypeFormated = contentType.split('/')[1] as string;

    return allowedFormats.includes(contentTypeFormated);
  }

  getValue(): string {
    return this.contentType;
  }
}
