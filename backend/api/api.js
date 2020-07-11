/* eslint-disable import/extensions */
require('@babel/register');
require('@babel/polyfill');

import bodyParser from 'body-parser';

import express from 'express';
import helmet from 'helmet';
import http from 'http';
// import mapRoutes from 'express-routes-mapper';
import compression from 'compression';

// const cors from 'cors');
import morgan from 'morgan';
// const fs from 'fs');
// const path from 'path');
import * as Sentry from '@sentry/node';

import routes from './controllers/index';

/**
 * server configuration
 */
import config from './config';
import dbService from './services/db.service.js';

import Promise from 'bluebird';
import redis from 'redis';

import RedisStore from 'connect-redis';

import logger from '../logger.js';
// const auth from './policies/auth.policy');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;
import dotenv from 'dotenv';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://8a0b81953b134fb3ad1daeaa83af56a5@o412718.ingest.sentry.io/5291989' });
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
}

import expressSessions from 'express-session';

const session = Promise.promisifyAll(expressSessions);

const redisClient = redis.createClient();

const RedisStoreClass = RedisStore(session);

app.use(session({
  store: new RedisStoreClass({ client: redisClient }),
  secret: 'do not tell anybody',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  unset: 'destroy',
  cookie: {
    secure: false,
    maxAge: 50000,
    httpOnly: false,
  },
}));

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '../../client', 'dist')));
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../../client', 'dist', 'index.html'));
  // });

  app.use(morgan('combined', { stream: logger.stream }));
} else {
  app.use(morgan('dev', { stream: logger.stream }));
}

const server = http.Server(app);
// const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
// const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');

const DB = dbService(environment, config.migrate).start();


// allow cross origin requests
// configure to only allow requests from certain origins
// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  // eslint-disable-next-line eqeqeq
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});


// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing the request bodys
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// fill routes for express application
// app.use('/api/auth', mappedOpenRoutes);
// app.use('/api', mappedAuthRoutes);

routes(app);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    // eslint-disable-next-line no-console
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  console.log(`Running on PORT:${config.port}`);
  return DB;
});
