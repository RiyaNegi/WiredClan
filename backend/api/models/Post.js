const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../../config/database');
const randomId = require('./randomId');

const Comment = require('./Comment');

// const Like = require('./Like');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  blah: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  published: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  karma: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  created: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${moment(this.createdAt).fromNow()}`;
    },
  },
}, { tableName: 'posts' });

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Post;
