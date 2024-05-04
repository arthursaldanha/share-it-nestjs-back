import request from 'supertest';
import { createEndToEndApp } from '@/tests/helpers/create-end-to-end-app';
import { clearDatabase } from '@/tests/helpers/clear-database';
import { replaceCloudflareBucketToMock } from '@/tests/contexts/bucket/mocks/infra/clouflare-bucket-provider';
import { makeFileOnDatabase } from '@/tests/contexts/bucket/mocks/file';

const makeFileRequest = () => ({
  name: 'valid_file_name',
  contentType: 'pdf',
});

describe('File', () => {
  beforeAll(() => {
    replaceCloudflareBucketToMock();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe('/uploads/:fileId - GET', () => {
    it('must return 200 in file query by fileId', async () => {
      await makeFileOnDatabase();

      const { app } = await createEndToEndApp();
      const { status, body } = await request(app.getHttpServer()).get(
        '/uploads/valid_file_id',
      );

      expect(status).toBe(200);
      expect(body).toEqual({ signedUrl: expect.any(String) });
    });

    it('must return 404 in file query by wrong fileId', async () => {
      const { app } = await createEndToEndApp();
      const { status, body } = await request(app.getHttpServer()).get(
        `/uploads/invalid_file_id`,
      );

      expect(status).toBe(404);
      expect(body).toEqual({
        code: 10002,
        message: expect.any(String),
      });
    });
  });

  describe('/uploads - POST', () => {
    it('must return 201 in file create and check if exists', async () => {
      const { app } = await createEndToEndApp();

      const responseCreate = await request(app.getHttpServer())
        .post('/uploads')
        .send(makeFileRequest());

      expect(responseCreate.status).toBe(201);
      expect(responseCreate.body).toEqual({
        id: expect.any(String),
        signedUrl: expect.any(String),
      });

      const { id } = responseCreate.body;

      const responseGet = await request(app.getHttpServer()).get(
        `/uploads/${id}`,
      );

      expect(responseGet.status).toBe(200);
    });

    it('should return 500 if there is any argument missing in the body', async () => {
      const invalidInput = makeFileRequest() as any;
      delete invalidInput.name;

      const { app } = await createEndToEndApp();
      const { status, body } = await request(app.getHttpServer())
        .get(`/uploads`)
        .send(invalidInput);

      expect(status).toBe(500);
      expect(body).toEqual({
        code: 10000,
        message: expect.any(String),
      });
    });
  });
});
