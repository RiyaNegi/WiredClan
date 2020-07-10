
import authService from '../services/auth.service';
import bcryptService from '../services/bcrypt.service';
import Google from '../services/google.service';

import User from '../models/User';
import logger from '../../logger';

const config = (router) => router
  .post('/googleLogin', async (req, res) => {
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
  })

  .post('/login', async (req, res) => {
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

        const userPassword = await User.unscoped().findOne({ where: { email } });
        if (bcryptService().comparePassword(password, userPassword.password)) {
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
  })

  .post('/register', async (req, res) => {
    const { body } = req;
    body.confirmPassword = body.password;
    if (body.password === body.confirmPassword) {
      try {
        const user = await User.create({
          email: body.email,
          password: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
          year: body.year,
          college: body.college,
          imageUrl: `https://api.adorable.io/avatars/80/${body.firstName}${body.lastName}.png`,
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
  });

export default {
  path: '/auth',
  config,
};
