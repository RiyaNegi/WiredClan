const User = require('../models/User');
const Post = require('../models/Post');
const PostService = require('../services/PostService');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');
const Like = require('../models/Like');
const Sequelize = require('sequelize');
const logger = require('../../logger');

const PostController = () => {
  const getAll = async (req, res) => {
    try {
      const result = await Post.findAll({
        where: { published: true, title: { [Sequelize.Op.iLike]: `%${req.query.search || ''}%` } },
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [Comment, User, Tag, Like],
        limit: 20,
        offset: (parseInt(req.query.page, 10) - 1) || 0 * 20,
      });

      return res.status(200).json({
        page: 1,
        result: result.map((i) => {
          const x = i.get({ plain: true });
          return {
            ...x,
            commentsCount: x.comments.length,
            comments: undefined,
            likesCount: x.likes.length,
            likedByCurrentUser: !!req.session.userId && !!x.likes.find((like) => like.userId === req.session.userId),
            likes: undefined,
          };
        }),
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    try {
      const post = await PostService.get({ id: req.params.id, userId: req.session.userId });
      return res.status(200).json(post);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const result = PostService.destroy({ id: req.params.id, userId: req.session.id });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const create = async (req, res) => {
    try {
      const post = await PostService.createPostAndTeammates({ ...req.body, userId: req.session.userId });
      return res.status(200).json({ ...post });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const post = await PostService.update({ ...req.body, id: req.params.id, userId: req.session.userId });
      return res.status(200).json({ ...post });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const createComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.session.userId } })).toJSON();
      const comment = await Comment.create({ ...req.body, userId: user.id, postId: req.params.postId });
      return res.status(200).json(comment);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const editComment = async (req, res) => {
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
  };

  const deleteComment = async (req, res) => {
    try {
      const user = (await User.findOne({ where: { id: req.session.userId } })).toJSON();
      const result = await Comment.destroy({ where: { id: req.params.id, userId: user.id } });
      return res.status(200).json({ status: !!result });
    } catch (err) {
      logger.error(err);
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
