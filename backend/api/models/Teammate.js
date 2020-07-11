import Sequelize from 'sequelize';

import sequelize from '../config/database';
import randomId from './randomId';

import Post from './Post';
import User from './User';

const Teammate = sequelize.define('teammate', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
}, { tableName: 'teammates' });

Teammate.belongsTo(User);
Teammate.belongsTo(Post);

Post.hasMany(Teammate);
User.hasMany(Teammate);

export default Teammate;
