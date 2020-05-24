const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../../config/database');

const Comment = require('./Comment');

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
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
