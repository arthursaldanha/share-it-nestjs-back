import 'reflect-metadata';
import 'dotenv/config';

import { createPostgreSqlContainer } from '@/tests/helpers/create-postgresql-container';

const createLocalStackContainer = async () => {
  try {
    await createPostgreSqlContainer();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

createLocalStackContainer()
  .then((_) => {
    import('./src/contexts/shared/bootstrap');
    console.info('[dev-infra] Infra Up');
  })
  .catch((error) => {
    console.error('[dev-infra] Infra error', error);
    throw error;
  });
