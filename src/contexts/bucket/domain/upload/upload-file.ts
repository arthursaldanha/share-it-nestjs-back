import { randomUUID } from 'crypto';

import {
  ContentType,
  Name,
} from '@/contexts/bucket/domain/upload/value-objects';

export class UploadFile {
  contentType: ContentType;
  name: Name;

  constructor(
    readonly id: string,
    readonly key: string,
    contentType: ContentType,
    name: Name,
    readonly createdAt: Date,
  ) {
    this.contentType = contentType;
    this.name = name;
  }

  static create(name: string, contentType: string) {
    const id = randomUUID();
    const key = randomUUID().concat('-').concat(name);

    return new UploadFile(
      id,
      key,
      new ContentType(contentType),
      new Name(name),
      new Date(),
    );
  }

  static restore(
    id: string,
    key: string,
    contentType: string,
    name: string,
    createdAt: Date,
  ) {
    return new UploadFile(
      id,
      key,
      new ContentType(contentType),
      new Name(name),
      createdAt,
    );
  }

  toJSON() {
    return {
      id: this.id,
      contentType: this.contentType.getValue(),
      key: this.key,
      name: this.name.getValue(),
      createdAt: this.createdAt.toISOString(),
    };
  }
}
