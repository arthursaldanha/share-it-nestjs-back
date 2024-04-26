import 'reflect-metadata';
import 'dotenv/config';

import { createMySqlContainer } from '@/tests/helpers/create-mysql-container';

const createLocalStackContainer = async () => {
  try {
    await createMySqlContainer();
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
