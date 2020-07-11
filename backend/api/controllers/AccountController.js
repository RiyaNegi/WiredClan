/* eslint-disable no-unused-vars */
import User from '../models/User';
import Post from '../models/Post';
import authService from '../services/auth.service';
import bcryptService from '../services/bcrypt.service';
import logger from '../../logger';

const AccountController = () => {
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

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const update = async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.session.userId } });
      const result = await user.update(req.body);
      return res.status(200).json({ result });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const get = async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.session.userId }, include: [Post] });
      return res.status(200).json({ user });
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    register,
    login,
    validate,
    get,
    update,
  };
};

export default AccountController;
