const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const Post = require('./Post');

const Tag = sequelize.define('tag', {
  text: {
    type: Sequelize.STRING,
  },
}, { tableName: 'tags' });

Tag.hasMany(Post);
Post.belongsTo(Tag);

module.exports = Tag;
