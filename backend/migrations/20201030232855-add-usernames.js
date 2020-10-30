/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const User = require('../api/models/User');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await User.update({
      userName: `temp_${Math.random().toString(36).substr(2, 5)}`,
    }, {
      returning: true,
      where: {
        userName: null,
      },
    });
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
