import Sequelize from 'sequelize';
import sequelize from '../config/database';
import randomId from './randomId';

import Post from './Post';

const Tag = sequelize.define('tag', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  uiData: {
    type: Sequelize.JSON,
  },
}, { tableName: 'tags' });

Tag.hasMany(Post);
Post.belongsTo(Tag);

export default Tag;
