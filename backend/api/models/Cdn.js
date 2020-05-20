const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const Cdn = sequelize.define('Cdn', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
}, { tableName: 'cdns' });

module.exports = Cdn;
