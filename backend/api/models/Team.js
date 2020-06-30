// const Sequelize = require('sequelize');

// const sequelize = require('../../config/database');
// const randomId = require('./randomId');

// const Post = require('./Post');
// const User = require('./User');

// const Team = sequelize.define('team', {
//   id: {
//     type: Sequelize.STRING,
//     defaultValue: randomId(),
//     primaryKey: true,
//   },
//   // UserId: {
//   //   type: Sequelize.INTEGER,
//   //   references: {
//   //     model: User,
//   //     key: 'id',
//   //   },
//   // },
//   // PostId: {
//   //   type: Sequelize.INTEGER,
//   //   references: {
//   //     model: Post,
//   //     key: 'id',
//   //   },
//   // },
// }, { tableName: 'likes' });

// Team.belongsTo(User);
// Team.belongsTo(Post);


// Post.hasMany(Team);
// User.hasMany(Team);

// module.exports = Team;
