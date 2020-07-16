module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'tags',
      'imageUrl',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );

    await queryInterface.addColumn(
      'tags',
      'uiData',
      {
        type: Sequelize.JSON,
        allowNull: true,
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'tags',
      'imageUrl',
    );

    await queryInterface.removeColumn(
      'tags',
      'uiData',
    );
  },
};
