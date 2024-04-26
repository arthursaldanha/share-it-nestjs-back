/* eslint-disable @typescript-eslint/ban-ts-comment */
import { config } from 'dotenv';
import 'reflect-metadata';
import { createMySqlContainer } from './tests/helpers/create-mysql-container';

export default async () => {
  try {
    config({
      path: '.env.example',
    });
    const { container } = await createMySqlContainer();

    // @ts-ignore
    global.localStackContainer = container;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
