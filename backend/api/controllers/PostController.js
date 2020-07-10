
// import PostService from '../services';
const PostService = require('../services/PostService');

const User = require('../models/User');
const Comment = require('../models/Comment');
const logger = require('../../logger');
const session = require('express-session');

const PostController = () => {
  const getAll = async (req, res) => {
    try {
      const result = await PostService.getAll(req.params, session.userId);

      return res.status(200).json({
        page: 1,
        result,
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
      const result = await PostService.destroy({ id: req.params.id, userId: req.session.userId });
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
