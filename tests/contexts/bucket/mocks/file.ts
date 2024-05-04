import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const makeFileOnDatabase = async () => {
  const prisma = new PrismaClient();

  await prisma.file.create({
    data: {
      id: 'valid_file_id',
      name: faker.system.fileName(),
      contentType: faker.system.fileExt('application/pdf'),
      key: faker.string.uuid(),
      createdAt: faker.date.anytime(),
    },
  });
};
