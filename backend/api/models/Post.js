const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Comment = require('./Comment');

const Post = sequelize.define('Post', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
}, { tableName: 'posts' });

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Post;
