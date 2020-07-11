import User from '../models/User';
import Like from '../models/Like';
import logger from '../../logger';

export default {
  path: '/likes',
  config: (router) => {
    router
      .post('/', async (req, res) => {
        try {
          const user = await User.findOne({ where: { id: req.session.userId } });
          let like = await Like.findOne({ where: { postId: req.body.postId, userId: user.id } });
          if (!like) {
            like = await Like.create({ userId: user.id, postId: req.body.postId });
          }
          return res.status(200).json({ success: !!like });
        } catch (err) {
          logger.error(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
      })
      .delete('/', async (req, res) => {
        try {
          const user = await User.findOne({ where: { id: req.session.userId } });
          const result = await Like.destroy({ where: { postId: req.body.postId, userId: user.id } });
          return res.status(200).json({ status: !!result });
        } catch (err) {
          logger.error(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
      });
    return router;
  },
};
