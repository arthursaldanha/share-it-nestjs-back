import { PrismaClient } from '@prisma/client';

export const clearDatabase = async () => {
  const prisma = new PrismaClient();

  try {
    await prisma.file.deleteMany();
  } catch (error) {
  } finally {
    prisma.$disconnect();
  }
};
