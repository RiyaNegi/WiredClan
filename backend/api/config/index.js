import privateRoutes from './routes/privateRoutes';
import publicRoutes from './routes/publicRoutes';

const config = {
  migrate: false,
  privateRoutes,
  publicRoutes,
  port: process.env.PORT || '8000',
};

export default config;
