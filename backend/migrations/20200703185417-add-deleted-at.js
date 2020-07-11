export default {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'posts',
    'deletedAt',
    Sequelize.DATE,
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'posts',
    'deletedAt',
  ),
};
