/* eslint-disable no-unused-vars */

import moment from 'moment';

// import Hackathon from '../api/models/Hackathon';
const Hackathon = require('../api/models/Hackathon');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await Hackathon.create({
      name: 'FLAM-NOV-2020',
      startDate: moment().subtract('2', 'minutes').format(('YYYY-MM-DD HH:mm')),
      endDate: moment().add('1', 'days').format(('YYYY-MM-DD HH:mm')),
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
