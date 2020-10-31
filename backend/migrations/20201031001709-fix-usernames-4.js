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

const asyncForEach = async (array, callback) => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await User.findAll({
      where: {
        userName: 'temp_5KySMfNFX',
      },
    }).then(async (users) => {
      await asyncForEach(users, async (user) => {
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
