import Sequelize from 'sequelize';
import bcryptService from '../services/bcrypt.service';
import randomId from './randomId';

import sequelize from '../config/database';

import Post from './Post';
import Comment from './Comment';
// const Like from './Like');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  userName: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  bio: {
    type: Sequelize.STRING,
  },
  avatar: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  department: {
    type: Sequelize.STRING,
  },
  college: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  mobile: {
    type: Sequelize.STRING,
  },
  badges: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  karma: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  viaGoogle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  registeredViaLoginViaGoogle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  registeredViaRegisterViaGoogle: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  hooks,
  tableName,
  defaultScope: {
    attributes: { exclude: ['mobile', 'password', 'email', 'registeredViaLoginViaGoogle'] },
  },
});

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = { ...this.get() };

  delete values.password;

  return values;
};

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
// User.belongsToMany(Post, { through: Like });

export default User;
