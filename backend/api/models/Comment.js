const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING,
  },
}, { tableName: 'comments' });

Comment.hasMany(Comment, { as: 'replyComments', foreignKey: 'parentId', useJunctionTable: false });

module.exports = Comment;
