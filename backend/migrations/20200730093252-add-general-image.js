/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const Tag = require('../api/models/Tag');
const Idea = require('../api/models/Idea');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await Tag.update({
      imageUrl: 'icons/icons8-women-macbook-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'General',
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
