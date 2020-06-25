const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const randomId = require('./randomId');

const Post = require('./Post');

const Tag = sequelize.define('tag', {
  id: {
    type: Sequelize.STRING,
    defaultValue: randomId(),
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
  },
}, { tableName: 'tags' });

Tag.hasMany(Post);
Post.belongsTo(Tag);

module.exports = Tag;
