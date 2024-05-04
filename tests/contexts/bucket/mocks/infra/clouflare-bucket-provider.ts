import { mock } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';

import { CloudflareBucket } from '@/contexts/bucket/domain/providers';
import { CloudflareBucketProvider } from '@/contexts/bucket/infra/providers';

export const cloudflareBucketStub = mock<CloudflareBucket>({
  createPreSignedUrl: () => Promise.resolve(faker.internet.url()),
  getPreSignedUrl: () => Promise.resolve(faker.internet.url()),
});

export const replaceCloudflareBucketToMock = () => {
  jest
    .spyOn(CloudflareBucketProvider.prototype, 'createPreSignedUrl')
    .mockImplementation(cloudflareBucketStub.createPreSignedUrl);
  jest
    .spyOn(CloudflareBucketProvider.prototype, 'getPreSignedUrl')
    .mockImplementation(cloudflareBucketStub.getPreSignedUrl);
};
