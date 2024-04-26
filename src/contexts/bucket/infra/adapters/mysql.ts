import { PrismaClient } from '@prisma/client';

export class MySqlClient {
  private client?: PrismaClient;

  connect(): this {
    const prisma = new PrismaClient();
    prisma.$connect();
    this.client = prisma;
    return this;
  }

  get connection(): PrismaClient {
    if (!this.client) {
      this.connect();
    }

    return this.client as PrismaClient;
  }
}
