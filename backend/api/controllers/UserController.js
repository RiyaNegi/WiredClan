/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';

import User from '../models/User';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Like from '../models/Like';
import Teammate from '../models/Teammate';

import Tag from '../models/Tag';
import sequelize from '../../config/database';
import logger from '../../logger';

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
        college: req.body.college,
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
      const [result, metadata] = await sequelize.query(`
      select users."id", users."firstName", users."lastName", users."badges", COUNT(users."id") AS "likesCount"
          from users
            inner join likes 
              on likes."userId" = users."id"
          group by users."id"
          ORDER BY COUNT(users."id") DESC
          LIMIT 5; `);

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
      let user = await User.findOne({
        where: Sequelize.or({
          id: req.params.id,
        }, {
          email: req.params.id,
        }),
        include: [Teammate, Like],
      });
      user = user.get({ plain: true });

      const postIds = user.teammates.map((teammate) => teammate.postId);
      delete user.teammates;
      let allPosts = await Post.findAll({
        where: { id: postIds },
        include: [Comment, Tag, Like],
      });
      allPosts = allPosts.map((post) => post.get({ plain: true }));

      let likesCount = 0;
      if (req.session.userId && user.id === req.session.userId) {
        user.drafts = allPosts.filter((post) => !(post.published)).map((x) => {
          likesCount += x.likes.length;
          return {
            ...x,
            commentsCount: x.comments.length,
            comments: undefined,
            likesCount: x.likes.length,
            likedByCurrentUser: !!req.session.userId && !!x.likes.find((like) => like.userId === req.session.userId),
            likes: undefined,
          };
        });
      }
      user.posts = allPosts.filter((post) => post.published).map((x) => {
        likesCount += x.likes.length;
        return {
          ...x,
          commentsCount: x.comments.length,
          comments: undefined,
          likesCount: x.likes.length,
          likedByCurrentUser: !!req.session.userId && !!x.likes.find((like) => like.userId === req.session.userId),
          likes: undefined,
        };
      });
      user.likesCount = likesCount;
      delete user.likes;
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

