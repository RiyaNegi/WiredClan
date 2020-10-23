module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.addColumn(
      'users',
      'bio',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
  
    down: async (queryInterface) => queryInterface.removeColumn(
      'users',
      'bio',
    ),
  };