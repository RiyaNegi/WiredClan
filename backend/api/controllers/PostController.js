const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Sequelize = require('sequelize');

const PostController = () => {
  const getAll = async (req, res) => {
    try {
      const result = await Post.findAll({
        where: { published: true, title: { [Sequelize.Op.iLike]: `%${req.query.search || ' '}%` } },
        include: [Comment, User],
        limit: 20,
        offset: (parseInt(req.query.page, 10) - 1) || 0 * 20,
      });
      return res.status(200).json({
        page: 1,
        result: result.map((i) => {
          const x = i.get({ plain: true });
          return { ...x, commentsCount: x.comments.length, comments: undefined };
        }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    try {
      const result = (await Post.findOne({
        where: Sequelize.or(
          {
            id: req.params.id, published: true,
          },
          {
            id: req.params.id, published: false, userId: req.token ? req.token.id : -1,
          },
        ),
        include: [
          {
            model: User,
            attributes: ['userName', 'imageUrl', 'firstName', 'lastName',
              'college', 'year', 'department', 'id'],
          },
          {
            model: Comment,
            where: { parentId: null },
            required: false,
            include: [
              {
                model: User,
                attributes: ['userName', 'imageUrl', 'firstName', 'lastName', 'college',
                  'year', 'department', 'id'],
              },
              {
                model: Comment,
                as: 'replyComments',
                include: {
                  model: User,
                  attributes: ['userName', 'imageUrl', 'firstName', 'lastName', 'college',
                    'year', 'department', 'id'],
                },
              },
            ],
          },
        ],
      })).toJSON();
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const result = await Post.destroy({ where: { id: req.params.id, userId: req.token.id } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
      const post = await Post.create({ ...req.body, userId: user.id });
      return res.status(200).json({ ...post.get({ plain: true }), user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
      const post = await Post.findOne({ where: { id: req.params.id, userId: user.id } });
      await post.update(req.body);

      return res.status(200).json({ ...post.get({ plain: true }), user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const createComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
      const comment = await Comment.create({ ...req.body, userId: user.id, postId: req.params.postId });
      return res.status(200).json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const editComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
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
      await comment.update(req.body);

      return res.status(200).json(comment);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const deleteComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.token.id } })).toJSON();
      const result = await Comment.destroy({ where: { id: req.params.id, userId: user.id } });
      return res.status(200).json({ status: !!result });
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
    editComment,
    deleteComment,
  };
};

module.exports = PostController;
