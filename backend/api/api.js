/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const compression = require('compression');

// const cors = require('cors');
const morgan = require('morgan');
// const fs = require('fs');
const path = require('path');
const Sentry = require('@sentry/node');

/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
// const auth = require('./policies/auth.policy');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;
require('dotenv').config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: 'https://8a0b81953b134fb3ad1daeaa83af56a5@o412718.ingest.sentry.io/5291989' });
  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
}

const Promise = require('bluebird');
const session = Promise.promisifyAll(require('express-session'));
const redis = require('redis');

const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

app.use(session({
  store: new RedisStore({ client: redisClient }),
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

const logger = require('../logger');

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client', 'build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html'));
  });

  app.use(morgan('combined', { stream: logger.stream }));
} else {
  app.use(morgan('dev', { stream: logger.stream }));
}

const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const DB = dbService(environment, config.migrate).start();

app.use(compression());

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// fill routes for express application
app.use('/auth', mappedOpenRoutes);
app.use('/api', mappedAuthRoutes);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    // eslint-disable-next-line no-console
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
