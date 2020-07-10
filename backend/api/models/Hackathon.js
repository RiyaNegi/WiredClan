const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const randomId = require('./randomId');

const Post = require('./Post');

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

module.exports = Hackathon;
