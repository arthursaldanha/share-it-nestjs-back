import 'reflect-metadata';
import 'dotenv/config';

import { MySqlContainer } from '@testcontainers/mysql';
import { createConnection } from 'mysql2/promise';
import { execSync } from 'child_process';

export const createMySqlContainer = async () => {
  try {
    const container = await new MySqlContainer().start();

    await createConnection({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getUserPassword(),
    });

    const DATABASE_PASSWORD = container.getUserPassword();
    const DATABASE_HOST = container.getHost();
    const DATABASE_PORT = `${container.getMappedPort(3306)}`;
    const DATABASE = container.getDatabase();

    process.env['DATABASE_URL'] =
      `mysql://root:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;

    execSync('npx prisma db push', {
      env: {
        ...process.env,
        DATABASE_URL: process.env['DATABASE_URL'],
      },
    });

    execSync('npx prisma generate', {
      env: {
        ...process.env,
        DATABASE_URL: process.env['DATABASE_URL'],
      },
    });

    return { container };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
