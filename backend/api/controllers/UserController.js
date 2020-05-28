/* eslint-disable no-unused-vars */
const User = require('../models/User');
const Post = require('../models/Post');
const Cdn = require('../models/Cdn');
const Account = require('../models/Account');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

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
      const user = await User.findOne({ where: { id: req.params.id }, include: [Post] });

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
    login,
    validate,
    get,
    account,
  };
};

module.exports = UserController;
