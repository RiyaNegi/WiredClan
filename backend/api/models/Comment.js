const Sequelize = require('sequelize');
const moment = require('moment');
const sequelize = require('../../config/database');

const Comment = sequelize.define('comment', {
  text: {
    type: Sequelize.STRING,
  },
  created: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${moment(this.createdAt).fromNow()}`;
    },
  },
}, { tableName: 'comments' });

Comment.hasMany(Comment, { as: 'replyComments', foreignKey: 'parentId', useJunctionTable: false });

module.exports = Comment;
