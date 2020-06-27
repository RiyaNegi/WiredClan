/* eslint-disable no-unused-vars */
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Tag = require('../models/Tag');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Sequelize = require('sequelize');
const Google = require('../services/google.service');
const sequelize = require('../../config/database');
const logger = require('../../logger');

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;
    if (body.password === body.confirmPassword) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
        });
        const token = authService().issue({ id: user.id });
        req.session.userId = user.id;

        req.session.cookie.originalMaxAge = 31556952000;
        return res.status(200).json({ token, user });
      } catch (err) {
        logger.error(err);
        return res.status(400).json({ msg: 'The email is already registered.' });
      }
    }

    return res.status(400).json({ msg: 'Passwords don\'t match' });
  };

  const googleRegister = async (req, res) => {
    const { body } = req;
    body.password = 'random_password';
    body.confirmPassword = 'random_password';
    const googleVerified = await Google.verifyLogin({ accessToken: body.accessToken, email: body.email });
    if (googleVerified) {
      try {
        const user = await User
          .findOne({
            where: {
              email: body.email,
            },
          });

        if (!user) {
          const newUser = await User.create({
            email: body.email,
            password: body.password,
            viaGoogle: true,
            registeredViaRegisterViaGoogle: true,
          });
          const token = authService().issue({ id: newUser.id });
          req.session.userId = newUser.id;
          req.session.cookie.originalMaxAge = 31556952000;

          return res.status(200).json({ token, user: newUser, newUser: true });
        }

        const token = authService().issue({ id: user.id });
        req.session.userId = user.id;
        req.session.cookie.originalMaxAge = 31556952000;

        return res.status(200).json({ token, user });
      } catch (err) {
        logger.error(err);
        return res.status(400).json({ msg: 'The email is already registered.' });
      }
    }

    return res.status(400).json({ msg: 'Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      try {
        const user = await User
          .findOne({
            where: {
              email,
            },
          });
        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id });
          req.session.userId = user.id;
          req.session.cookie.originalMaxAge = 31556952000;

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const googleLogin = async (req, res) => {
    const {
      email, accessToken, firstName, lastName,
    } = req.body;
    try {
      const googleVerified = await Google.verifyLogin({ accessToken, email });
      const password = 'random_password';
      if (googleVerified) {
        const user = await User
          .findOne({
            where: {
              email,
            },
          });

        if (!user) {
          const newUser = await User.create({
            email,
            password,
            firstName,
            lastName,
            viaGoogle: true,
            registeredViaLoginViaGoogle: true,
            imageUrl: `https://api.adorable.io/avatars/80/${firstName}${lastName}.png`,
          });
          const token = authService().issue({ id: newUser.id });
          req.session.userId = newUser.id;
          req.session.cookie.originalMaxAge = 31556952000;

          return res.status(200).json({ token, user: newUser, newUser: true });
        }
        const token = authService().issue({ id: user.id });
        req.session.userId = user.id;
        req.session.cookie.originalMaxAge = 31556952000;


        return res.status(200).json({ token, user });
      }
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const get = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.params.id,
        },
        include: [{
          model: Post,
          include: [Comment, Tag, Like],
        }, { model: Like }],
      });
      user = user.get({ plain: true });

      if (req.session.userId && user.id === req.session.userId) {
        user.drafts = user.posts.filter((post) => !(post.published)).map((x) => ({
          ...x,
          commentsCount: x.comments.length,
          comments: undefined,
          likesCount: x.likes.length,
          likedByCurrentUser: !!req.session.userId && !!x.likes.find((like) => like.userId === req.session.userId),
          likes: undefined,
        }));
      }
      user.posts = user.posts.filter((post) => post.published).map((x) => ({
        ...x,
        commentsCount: x.comments.length,
        comments: undefined,
        likesCount: x.likes.length,
        likedByCurrentUser: !!req.session.userId && !!x.likes.find((like) => like.userId === req.session.userId),
        likes: undefined,
      }));
      user.likesCount = user.likes.length;
      delete user.likes;
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const [result, metadata] = await sequelize.query(`
        select users."id", users."firstName", users."lastName", users."badges", COUNT(users."id") AS "likesCount"
            from users
              inner join likes 
                on likes."userId" = users."id"
            group by users."id"
            ORDER BY COUNT(users."id") DESC
            LIMIT 5; `);

      return res.status(200).json({
        page: 1,
        result,
      });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const edit = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.session.userId,
        },
      });

      if (req.body.year === '') {
        req.body.year = null;
      }

      user = await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
        year: req.body.year,
        college: req.body.college,
      });
      user = user.get({ plain: true });
      return res.status(200).json(user);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const account = async (req, res) => {
    try {
      const users = await User.findOne({ where: { id: req.session.userId }, include: [Post] });

      return res.status(200).json({ users });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const logout = async (req, res) => {
    try {
      await req.session.destroyAsync();
      return res.status(200).json({ sucess: true });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    register,
    googleRegister,
    login,
    googleLogin,
    validate,
    get,
    getAll,
    edit,
    account,
    logout,
  };
};

module.exports = UserController;
