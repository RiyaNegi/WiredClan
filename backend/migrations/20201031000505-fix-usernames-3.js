/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

import { post } from 'request';
import { userSetter } from 'core-js/fn/symbol';

const { customAlphabet } = require('nanoid');

const User = require('../api/models/User');

const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

export default function randomId() {
  return customAlphabet(alphabet, 9);
}

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await User.findAll({
      where: {
        userName: 'temp_5KySMfNFX',
      },
    }).then(async (users) => {
      users.forEach(async (user) => {
        const result = await user.update({ userName: `${user.firstName ? user.firstName : 'temp'}_${randomId()().substring(0, 3)}` });
      });
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
