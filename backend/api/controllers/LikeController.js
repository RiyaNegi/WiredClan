
const User = require('../models/User');
const Like = require('../models/Like');

const LikeController = () => {
  const create = async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.session.userId } });
      let like = await Like.findOne({ where: { postId: req.body.postId, userId: user.id } });
      if (!like) {
        like = await Like.create({ userId: user.id, postId: req.body.postId });
      }
      return res.status(200).json({ success: !!like });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.session.userId } });
      const result = await Like.destroy({ where: { postId: req.body.postId, userId: user.id } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    create,
    destroy,
  };
};

module.exports = LikeController;
