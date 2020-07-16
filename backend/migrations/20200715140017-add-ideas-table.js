module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ideas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },

      difficulty: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addColumn(
      'ideas',
      'tagId',
      {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: {
            tableName: 'tags',
            schema: 'public',
          },
          key: 'id',
        },
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ideas');
  },
};
