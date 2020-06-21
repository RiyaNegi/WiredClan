/* eslint-disable no-unused-vars */
const User = require('../models/User');
const Post = require('../models/Post');
const Tag = require('../models/Tag');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const Sequelize = require('sequelize');
const Google = require('../services/google.service');

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
        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
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
          return res.status(200).json({ token, user: newUser, newUser: true });
        }

        const token = authService().issue({ id: user.id });
        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
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

          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
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
          return res.status(200).json({ token, user: newUser, newUser: true });
        }
        const token = authService().issue({ id: user.id });

        return res.status(200).json({ token, user });
      }
    } catch (err) {
      console.log(err);
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
          include: [Tag],
        }],
      });
      user = user.get({ plain: true });
      if (req.token && user.id === req.token.id) {
        user.drafts = user.posts.filter((post) => !(post.published));
      }
      user.posts = user.posts.filter((post) => post.published);
      return res.status(200).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const result = await User.findAll({
        limit: 5,
        order: [
          ['karma', 'DESC'],
        ],
      });
      return res.status(200).json({
        page: 1,
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const edit = async (req, res) => {
    try {
      let user = await User.findOne({
        where: {
          id: req.token.id,
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
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const account = async (req, res) => {
    try {
      const users = await User.findOne({ where: { id: req.token.id }, include: [Post] });

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
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
  };
};

module.exports = UserController;
