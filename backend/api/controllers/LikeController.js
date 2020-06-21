
const User = require('../models/User');
const Like = require('../models/Like');

const LikeController = () => {
  const create = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
      const result = await Like.create({ userId: user.id, postId: req.body.postId });
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    create,
  };
};

module.exports = LikeController;
