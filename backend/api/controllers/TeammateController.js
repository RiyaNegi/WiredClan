import Post from '../models/Post';
import Teammate from '../models/Teammate';

import logger from '../../logger';

const config = (router) => router
  .delete('/', async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.body.postId }, include: [Teammate] });
      if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(req.session.userId) === false) {
        throw new Error('Unauthorized access in teammates API');
      }
      if (req.session.userId === req.body.userId) {
        return res.status(200).json({ status: 'Cannot remove owner' });
      }

      const result = await Teammate.destroy({ where: { postId: req.body.postId, userId: req.body.userId } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  })
  .post('/', async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.body.postId }, include: [Teammate] });
      if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(req.session.userId) === false) {
        throw new Error('Unauthorized access in teammates API');
      }

      let teammate = await Teammate.findOne({ where: { postId: req.body.postId, userId: req.body.userId } });
      if (!teammate) {
        teammate = await Teammate.create({ userId: req.body.userId, postId: req.body.postId });
      }
      teammate = teammate.get({ plain: true });
      return res.status(200).json({ ...teammate });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

export default {
  path: '/teammates',
  config,
};
