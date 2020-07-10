import Sequelize from 'sequelize';
import moment from 'moment';
import sequelize from '../../config/database';
import randomId from './randomId';

import Comment from './Comment';

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
}, { tableName: 'posts', paranoid: true });

Post.hasMany(Comment);
Comment.belongsTo(Post);

export default Post;
