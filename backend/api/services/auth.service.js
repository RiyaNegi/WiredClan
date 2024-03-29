import jwt from 'jsonwebtoken';

const secret = process.env.NODE_ENV === 'production' ? 'process.env.JWT_SECRET' : 'secret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: '90d' });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

export default authService;
