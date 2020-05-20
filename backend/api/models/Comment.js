const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Comment = sequelize.define('Comment', {
  text: {
    type: Sequelize.STRING,
  },
}, { tableName: 'comments' });

module.exports = Comment;
