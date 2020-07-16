/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

const Tag = require('../api/models/Tag');
const Idea = require('../api/models/Idea');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    let tag = await Tag.update({
      text: 'App Development',
      imageUrl: 'icons/icons8-android-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'Mobile',
      },
    });
    await Idea.bulkCreate([
      {
        tagId: tag[1][0].id,
        text: 'Simple calculator app',
        difficulty: 'Beginner',
      },
      {
        tagId: tag[1][0].id,
        text: 'To-do list app',
        difficulty: 'Beginner',
      },
    ], {
      include: [Tag],
    });

    tag = await Tag.update({
      imageUrl: 'icons/icons8-c-programming-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'C/C++',
      },
    });
    await Idea.bulkCreate([
      {
        tagId: tag[1][0].id,
        text: 'The Snake game in command line',
        difficulty: 'Medium',
      },
      {
        tagId: tag[1][0].id,
        text: 'Tic tac toe in command line',
        difficulty: 'Beginner',
      },
    ], {
      include: [Tag],
    });

    tag = await Tag.update({
      imageUrl: 'icons/icons8-c-programming-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'C/C++',
      },
    });
    await Idea.bulkCreate([
      {
        tagId: tag[1][0].id,
        text: 'The Snake game in command line',
        difficulty: 'Medium',
      },
      {
        tagId: tag[1][0].id,
        text: 'Tic tac toe in command line',
        difficulty: 'Beginner',
      },
    ], {
      include: [Tag],
    });

    tag = await Tag.update({
      text: 'Web Development',
      imageUrl: 'icons/icons8-web-100.png',
      uiData: {
        height: '70px',
      },
    }, {
      returning: true,
      where: {
        text: 'Web',
      },
    });
    await Idea.bulkCreate([
      {
        tagId: tag[1][0].id,
        text: 'Make a simple website design in HTML using Bootstrap',
        difficulty: 'Easy',
      },
      {
        tagId: tag[1][0].id,
        text: 'Make a clone of Flipkart in HTML/CSS',
        difficulty: 'Medium',
      },
      {
        tagId: tag[1][0].id,
        text: 'Make a todo app website that can login via Facebook',
        difficulty: 'Hard',
      },
    ], {
      include: [Tag],
    });

    tag = await Tag.update({
      imageUrl: 'icons/icons8-cloud-link-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'Cloud',
      },
    });

    tag = await Tag.update({
      imageUrl: 'icons/icons8-artificial-intelligence-100.png',
      uiData: {
        height: '80px',
      },
    }, {
      returning: true,
      where: {
        text: 'Data/ML',
      },
    });

    tag = await Tag.create({
      imageUrl: 'icons/icons8-java-100.png',
      text: 'Java',
      uiData: {
        height: '80px',
      },
    });
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
