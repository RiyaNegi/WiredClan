module.exports = {
    up: async (queryInterface, Sequelize) => queryInterface.addColumn(
      'users',
      'avatar',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
    ),
  
    down: async (queryInterface) => queryInterface.removeColumn(
      'users',
      'avatar',
    ),
  };