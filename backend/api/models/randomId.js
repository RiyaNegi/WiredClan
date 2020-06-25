const { customAlphabet } = require('nanoid');

const alphabet = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

module.exports = function randomId() {
  return customAlphabet(alphabet, 9);
};
