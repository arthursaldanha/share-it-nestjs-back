import 'reflect-metadata';
import 'dotenv/config';

import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { Client } from 'pg';
import { execSync } from 'child_process';

export const createPostgreSqlContainer = async () => {
  try {
    const container = await new PostgreSqlContainer().start();

    const DATABASE_USERNAME = container.getUsername();
    const DATABASE_PASSWORD = container.getPassword();
    const DATABASE_HOST = container.getHost();
    const DATABASE_PORT = container.getPort();
    const DATABASE = container.getDatabase();

    new Client({
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      database: DATABASE,
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    });

    process.env['DATABASE_URL'] =
      `postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE}`;

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
