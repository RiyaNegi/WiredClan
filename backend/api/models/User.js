const Sequelize = require('sequelize');
const bcryptService = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const Post = require('./Post');
const Comment = require('./Comment');
// const Like = require('./Like');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('user', {
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
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;

  return values;
};

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
// User.belongsToMany(Post, { through: Like });


module.exports = User;
