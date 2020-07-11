import Sequelize from 'sequelize';
import moment from 'moment';
import sequelize from '../config/database';
import randomId from './randomId';

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
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

export default Comment;
