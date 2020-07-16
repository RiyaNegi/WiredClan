import Sequelize from 'sequelize';
import sequelize from '../config/database';
import randomId from './randomId';

import Tag from './Tag';

const Idea = sequelize.define('idea', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
  },
  difficulty: {
    type: Sequelize.STRING,
  },
}, { tableName: 'ideas' });

Idea.belongsTo(Tag);
Tag.hasMany(Idea);

export default Idea;
