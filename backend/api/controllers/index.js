import express from 'express';

import AuthController from './AuthController';
import LikeController from './LikeController';
import PostController from './PostController';
import TagController from './TagController';
import TeammateController from './TeammateController';
import UserController from './UserController';
import HackathonController from './HackathonController';

const controllers = [
  HackathonController,
  AuthController,
  LikeController,
  PostController,
  TagController,
  TeammateController,
  UserController,
];

export default (app) => {
  controllers
    .forEach((routeModule) => {
      const router = express.Router();
      const route = routeModule.config
        ? routeModule.config(router)
        : routeModule(router);
      app.use(`/api${routeModule.path}`, route);
    });
};

// https://codesandbox.io/s/articlemediumexpressrouting-q2fb8
// https://medium.com/better-programming/how-to-write-smarter-routing-with-express-and-node-js-4cc53bbc55e5
