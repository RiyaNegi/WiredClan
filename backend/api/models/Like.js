// const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Post = require('./Post');
const User = require('./User');

const Like = sequelize.define('like', {
  // UserId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  // },
  // PostId: {
  //   type: Sequelize.INTEGER,
  //   references: {
  //     model: Post,
  //     key: 'id',
  //   },
  // },
}, { tableName: 'likes' });

Like.belongsTo(User);
Like.belongsTo(Post);


Post.hasMany(Like);
User.hasMany(Like);


// User.belongsToMany(Post, { through: Like });
// Post.belongsToMany(User, { through: Like });


module.exports = Like;
