/* eslint-disable no-unused-vars */

export default {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.sequelize.query(`

    alter table likes
    drop constraint "likes_userId_fkey",
    add constraint "likes_userId_fkey"
      foreign key("userId")
      references users("id")
      on delete cascade;

    alter table posts
    drop constraint "posts_userId_fkey",
    add constraint "posts_userId_fkey"
      foreign key("userId")
      references users("id")
      on delete cascade;

    alter table teammates
    drop constraint "teammates_userId_fkey",
    add constraint "teammates_userId_fkey"
      foreign key("userId")
      references users("id")
      on delete cascade;
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
  },
};
