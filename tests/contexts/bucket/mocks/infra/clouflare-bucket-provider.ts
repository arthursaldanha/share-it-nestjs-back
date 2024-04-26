import { mock } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';
import { CloudflareBucket } from '@/contexts/bucket/domain/providers';

export const cloudflareBucketStub = mock<CloudflareBucket>({
  createPreSignedUrl: () => Promise.resolve(faker.internet.url()),
  getPreSignedUrl: () => Promise.resolve(faker.internet.url()),
});
