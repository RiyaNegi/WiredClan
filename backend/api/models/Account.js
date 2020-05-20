const Sequelize = require('sequelize');

const User = require('./User');
const Cdn = require('./Cdn');

const sequelize = require('../../config/database');

const Account = sequelize.define('Account', {
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  api_key: {
    type: Sequelize.STRING,
  },
}, { tableName: 'accounts' });

User.belongsToMany(Cdn, { through: Account });
Cdn.belongsToMany(User, { through: Account });

module.exports = Account;
