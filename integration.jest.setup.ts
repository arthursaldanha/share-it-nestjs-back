/* eslint-disable @typescript-eslint/ban-ts-comment */
import { config } from 'dotenv';
import 'reflect-metadata';
import { createPostgreSqlContainer } from './tests/helpers/create-postgresql-container';

export default async () => {
  try {
    config({
      path: '.env.example',
    });
    const { container } = await createPostgreSqlContainer();

    // @ts-ignore
    global.localStackContainer = container;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
