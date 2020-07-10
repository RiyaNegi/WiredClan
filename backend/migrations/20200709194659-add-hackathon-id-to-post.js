

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'posts',
    'hackathonId',
    {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: {
          tableName: 'hackathons',
          schema: 'public',
        },
        key: 'id',
      },
    },
  ),

  down: async (queryInterface) => queryInterface.removeColumn(
    'posts',
    'hackathonId',
  ),
};
