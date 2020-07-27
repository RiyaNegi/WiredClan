/* eslint-disable no-unused-vars */

export default {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.sequelize.query(`

    CREATE INDEX comments_userId_idx ON comments ("userId");
    CREATE INDEX comments_postId_idx ON comments ("postId");
    CREATE INDEX comments_parentId_idx ON comments ("parentId");

    alter table comments
    drop constraint "comments_userId_fkey",
    add constraint "comments_userId_fkey"
      foreign key("userId")
      references users("id")
      on delete cascade;
  
    CREATE INDEX likes_userId_idx ON likes ("userId");
    CREATE INDEX likes_postId_idx ON likes ("postId");

    CREATE INDEX teammates_userId_idx ON teammates ("userId");
    CREATE INDEX teammates_postId_idx ON teammates ("postId");

    CREATE INDEX posts_userId_idx ON posts ("userId");
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
