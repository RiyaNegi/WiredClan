import PostService from '../services/PostService';

import User from '../models/User';
import Comment from '../models/Comment';
import logger from '../../logger';

const config = (router) => router
  .get('/', async (req, res) => {
    try {
      const result = await PostService.getAll(req.query, req.session.userId);
      return res.status(200).json({
        page: req.params.page,
        result,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const result = await PostService.destroy(req.params.id, req.session.userId);
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const post = await PostService.get({ id: req.params.id, userId: req.session.userId });
      return res.status(200).json(post);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .post('/', async (req, res) => {
    try {
      const post = await PostService.createPostAndTeammates(req.body, req.session.userId);
      return res.status(200).json({ ...post });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .post('/:id', async (req, res) => {
    try {
      const post = await PostService.update({ ...req.body, id: req.params.id, userId: req.session.userId });
      return res.status(200).json({ ...post });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .post('/:postId/comments/', async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.session.userId } })).toJSON();
      const comment = await Comment.create({ ...req.body, userId: user.id, postId: req.params.postId });
      return res.status(200).json(comment);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .post('/:postId/comments/:id', async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.session.userId } })).toJSON();
      const comment = await Comment.findOne({
        where: { id: req.params.id, userId: user.id },
        include: {
          model: Comment,
          as: 'replyComments',
          include: {
            model: User,
            attributes: ['userName', 'imageUrl', 'firstName', 'lastName', 'college',
              'year', 'department', 'id'],
          },
        },
      });

      await comment.update({ text: req.body.text });

      return res.status(200).json(comment);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })

  .delete('/:postId/comments/:id', async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.session.userId } })).toJSON();
      const result = await Comment.destroy({ where: { id: req.params.id, userId: user.id } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

export default {
  path: '/posts',
  config,
};
