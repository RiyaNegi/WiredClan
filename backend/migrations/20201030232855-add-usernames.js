/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const { customAlphabet } = require('nanoid');

const User = require('../api/models/User');

const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

export default function randomId() {
  return customAlphabet(alphabet, 9);
}

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await User.update({
      userName: `temp_${randomId()()}`,
    }, {
      returning: true,
      where: {
        userName: 'temp_yisuh',
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
