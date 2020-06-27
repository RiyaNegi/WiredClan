/* eslint-disable no-unused-vars */

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    queryInterface.sequelize.query(`
    ALTER TABLE posts
    ADD COLUMN blah text;    
    `);
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
  }
};
