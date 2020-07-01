const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const randomId = require('./randomId');

const Post = require('./Post');
const User = require('./User');

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

module.exports = Teammate;
