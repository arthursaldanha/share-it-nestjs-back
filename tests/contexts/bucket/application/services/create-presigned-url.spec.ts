import { CreatePreSignedUrlService } from '@/contexts/bucket/application/services';
import { fileRepositoryStub } from '@/tests/contexts/bucket/mocks/infra/file-repository';
import { cloudflareBucketStub } from '@/tests/contexts/bucket/mocks/infra/clouflare-bucket-provider';
import { ContentTypeNotAllowedError } from '@/contexts/bucket/domain/errors';
import { UploadFile } from '@/contexts/bucket/domain/upload/upload-file';

const makeSut = () => {
  const sut = new CreatePreSignedUrlService(
    fileRepositoryStub,
    cloudflareBucketStub,
  );
  return { sut };
};

const makeValidInput = () => ({
  name: 'valid_name',
  contentType: 'pdf',
});

const makeInvalidInputWithContentType = () => ({
  name: 'valid_name',
  contentType: 'application/x-msdownload',
});

const makeInvalidInputWithName = () => ({
  name: '',
  contentType: 'pdf',
});

describe('CreatePreSignedUrlService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw ContentTypeNotAllowedError if content type are not allowed', async () => {
    const { sut } = makeSut();

    const input = makeInvalidInputWithContentType();

    const error = new ContentTypeNotAllowedError(input.contentType);

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should throw Error if file name are empty', async () => {
    const { sut } = makeSut();

    const input = makeInvalidInputWithName();

    const error = new Error('Nome é obrigatório.');

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should throw Error if cloudflare bucket provider fails', async () => {
    const { sut } = makeSut();
    const error = new Error('Não foi possível criar a URL de upload');

    jest
      .spyOn(cloudflareBucketStub, 'createPreSignedUrl')
      .mockRejectedValueOnce(error);

    const input = makeValidInput();

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should throw Error if files repository fails', async () => {
    const { sut } = makeSut();
    const error = new Error(
      'Não foi possível salvar o arquivo na base de dados',
    );

    jest.spyOn(fileRepositoryStub, 'save').mockRejectedValueOnce(error);

    const input = makeValidInput();

    await expect(sut.execute(input)).rejects.toThrow(error);
  });

  it('should call cloudflareBucketProvider.createPreSignedUrl with correct values', async () => {
    const { sut } = makeSut();

    const cloudflareBucketSpy = jest.spyOn(
      cloudflareBucketStub,
      'createPreSignedUrl',
    );

    const input = makeValidInput();
    await sut.execute(input);

    expect(cloudflareBucketSpy).toHaveBeenCalledWith(expect.any(UploadFile));
  });

  it('should call fileRepository.save with correct values', async () => {
    const { sut } = makeSut();

    const fileRepositorySpy = jest.spyOn(fileRepositoryStub, 'save');

    const input = makeValidInput();
    await sut.execute(input);

    expect(fileRepositorySpy).toHaveBeenCalledWith(expect.any(UploadFile));
  });

  it('should return correct values', async () => {
    const { sut } = makeSut();

    jest
      .spyOn(cloudflareBucketStub, 'createPreSignedUrl')
      .mockResolvedValueOnce('valid_signed_url');

    const input = makeValidInput();
    const output = await sut.execute(input);

    expect(output).toEqual({
      signedUrl: 'valid_signed_url',
      id: expect.any(String),
    });
  });
});
