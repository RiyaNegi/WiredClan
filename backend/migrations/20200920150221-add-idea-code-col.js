/* eslint-disable no-unused-vars */

import moment from 'moment';

// import Hackathon from '../api/models/Hackathon';
const Hackathon = require('../api/models/Hackathon');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'posts',
      'ideaCode',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
