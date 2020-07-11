import Sequelize from 'sequelize';
import sequelize from '../config/database';
import randomId from './randomId';

import Post from './Post';

const Hackathon = sequelize.define('hackathon', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  startDate: {
    type: Sequelize.TIME,
  },
  endDate: {
    type: Sequelize.TIME,
  },

}, { tableName: 'hackathons' });

Hackathon.hasMany(Post);
Post.belongsTo(Hackathon);

export default Hackathon;
