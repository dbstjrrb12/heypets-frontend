import { serviceWorker } from './browser';
import { server } from './server';

export const initMocks = () => {
  if (typeof window === 'undefined') {
    server.listen();
  } else {
    serviceWorker().start();
  }
};
