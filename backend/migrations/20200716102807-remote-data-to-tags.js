/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const Tag = require('../api/models/Tag');
const Idea = require('../api/models/Idea');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await Tag.destroy({
      where: {
        text: 'Data/ML',
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
