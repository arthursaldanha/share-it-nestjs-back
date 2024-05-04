import { GetPreSignedUrlService } from '@/contexts/bucket/application/services';
import { fileRepositoryStub } from '@/tests/contexts/bucket/mocks/infra/file-repository';
import { cloudflareBucketStub } from '@/tests/contexts/bucket/mocks/infra/clouflare-bucket-provider';
import { FileNotFoundError } from '@/contexts/bucket/domain/errors/file-not-found';
import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';

const makeSut = () => {
  const sut = new GetPreSignedUrlService(
    fileRepositoryStub,
    cloudflareBucketStub,
  );
  return { sut };
};

const makeValidInput = () => 'valid_id';

describe('GetPreSignedUrlService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw error if filesRepository.getById fails', async () => {
    const { sut } = makeSut();
    const error = new Error('Não foi possível obter o arquivo');

    jest.spyOn(fileRepositoryStub, 'getById').mockRejectedValueOnce(error);

    const input = makeValidInput();

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should throw FileNotFoundError if file is not founded', async () => {
    const { sut } = makeSut();

    jest.spyOn(fileRepositoryStub, 'getById').mockResolvedValueOnce(null);

    const input = makeValidInput();
    const error = new FileNotFoundError(input);

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should throw Error if cloudflareBucketProvider.getPreSignedUrl fails', async () => {
    const { sut } = makeSut();
    const error = new Error('Não foi possível obter a URL de upload');

    jest
      .spyOn(cloudflareBucketStub, 'getPreSignedUrl')
      .mockRejectedValueOnce(error);

    const input = makeValidInput();

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should call filesRepository.getById with correct values', async () => {
    const { sut } = makeSut();

    const fileRepositorySpy = jest.spyOn(fileRepositoryStub, 'getById');

    const input = makeValidInput();
    await sut.execute(input);

    expect(fileRepositorySpy).toHaveBeenCalledWith(input);
  });

  it('should call cloudflareBucketProvider.getPreSignedUrl with correct values', async () => {
    const { sut } = makeSut();

    const cloudflareBucketSpy = jest.spyOn(
      cloudflareBucketStub,
      'getPreSignedUrl',
    );

    const input = makeValidInput();
    await sut.execute(input);

    expect(cloudflareBucketSpy).toHaveBeenCalledWith(expect.any(UploadFile));
  });

  it('should return correct values', async () => {
    const { sut } = makeSut();

    jest
      .spyOn(cloudflareBucketStub, 'getPreSignedUrl')
      .mockResolvedValueOnce('valid_signed_url');

    const input = makeValidInput();
    const output = await sut.execute(input);

    expect(output).toEqual({
      signedUrl: 'valid_signed_url',
    });
  });
});
