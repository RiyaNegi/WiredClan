const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const PostController = () => {
  const getAll = async (req, res) => {
    try {
      const result = await Post.findAll({
        include: { model: Comment },
        limit: 20,
        offset: (parseInt(req.query.page, 10) - 1) || 0 * 20,
      });
      return res.status(200).json({
        page: 1,
        result: result.map((i) => {
          const x = i.get({ plain: true });
          return { ...x, commentsCount: x.Comments.length, Comments: undefined };
        }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    try {
      const result = await Post.findOne({ where: { id: req.params.id }, include: [User, { model: Comment, include: [User] }] });
      // const x = await result.getUser();
      // console.log(x)
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const dns = new Post(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.edit(req.params.dnsId, req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const destroy = async (req, res) => {
    try {
      const dns = new Post(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.destroy(req.params.dnsId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).get({ plain: true });
      const post = await Post.create({ ...req.body, UserId: user.id });
      return res.status(200).json({ ...post.get({ plain: true }), User: user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const createComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).get({ plain: true });
      const comment = await Comment.create({ ...req.body, UserId: user.id, PostId: req.params.postId });
      return res.status(200).json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    get,
    edit,
    destroy,
    create,
    createComment,
  };
};

module.exports = PostController;
