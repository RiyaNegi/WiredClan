/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';

import User from '../models/User';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Like from '../models/Like';
import Teammate from '../models/Teammate';

import Tag from '../models/Tag';
import sequelize from '../config/database';
import logger from '../../logger';
import UserService from '../services/UserService';

const config = (router) => router
  .post('/logout', async (req, res) => {
    try {
      await req.session.destroyAsync();
      return res.status(200).json({ sucess: true });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .patch('/:id', async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.session.userId,
        },
      });

      if (req.body.year === '') {
        req.body.year = null;
      }

      user = await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        year: req.body.year,
        mobile: req.body.mobile,
        college: req.body.college,
        avatar: req.body.avatar,
        bio: req.body.bio,
      });
      user = user.get({ plain: true });
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .get('/', async (req, res) => {
    try {
      const result = await UserService.getAll(req.query);

      return res.status(200).json({
        page: 1,
        result,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const user = await UserService.get(req.params.id, req.session.userId);
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

export default {
  path: '/users',
  config,
};
