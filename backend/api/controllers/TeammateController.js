
const User = require('../models/User');
const Post = require('../models/Post');
const Teammate = require('../models/Teammate');
const logger = require('../../logger');

const TeammateController = () => {
  const create = async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.body.postId }, include: [Teammate] });
      if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(req.session.userId) === false) {
        return null;
      }

      let teammate = await Teammate.findOne({ where: { postId: req.body.postId, userId: req.body.userId } });
      if (!teammate) {
        teammate = await Teammate.create({ userId: req.body.userId, postId: req.body.postId });
      }
      return res.status(200).json({ ...teammate });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const post = await Post.findOne({ where: { id: req.body.postId }, include: [Teammate] });
      if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(req.session.userId) === false) {
        return null;
      }

      const result = await Teammate.destroy({ where: { postId: req.body.postId, userId: req.body.userId } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    create,
    destroy,
  };
};

module.exports = TeammateController;
