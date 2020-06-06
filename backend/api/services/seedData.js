const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const moment = require('moment');

const seed = async () => {
  await User.bulkCreate([
    {
      userName: 'random_user',
      firstName: 'Abcd',
      lastName: 'Alpha',
      department: 'Computer',
      college: 'I2IT',
      year: 2,
      imageUrl: 'https://api.adorable.io/avatars/80/random_user.png',
      email: 'abcd@gmail.com',
      password: 'password',
    },
    {
      userName: 'abcde',
      firstName: 'Abcde',
      lastName: 'Beta',
      department: 'ENTC',
      college: 'I2IT',
      year: 3,
      imageUrl: 'https://api.adorable.io/avatars/80/abcde.png',
      email: 'abcde@gmail.com',
      password: 'password',
    },
    {
      userName: 'thecodersblock',
      firstName: 'Raj',
      lastName: 'Negi',
      department: 'IT',
      college: 'I2IT',
      year: 4,
      imageUrl: 'https://api.adorable.io/avatars/80/thecodersblock.png',
      email: 'raj@gmail.com',
      password: 'password',
    },
  ], { individualHooks: true, include: { model: Post } })
    .then(async (users) => {
      await Post.bulkCreate([
        {
          userId: users[0].id,
          title: "I've Been Making a Video Series about Building a 16-bit Virtual Machine. This Episode Is All about Writing a Generic Parser for the Assembly Instructions.",
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is a lot of text. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(7, 'h'),
        },
        {
          userId: users[1].id,
          title: 'Generators in Rust, C++20, Go, and More',
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is something I made. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(10, 'h'),

        },
        {
          userId: users[2].id,
          title: "The Colorful Game of Life - a variant of Conway's Game of Life",
          published: false,
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is something I wrote. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(7, 'd'),

        },
        {
          userId: users[2].id,
          title: 'Feel-O-Meter (visualize the dominant emotions in your Spotify playlists based on lyrics)',
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is a lot of text by myself. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(17, 'd'),

        },
        {
          userId: users[1].id,
          title: 'What a typical 100% Serverless Architecture looks like in AWS!',
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is a lot of text. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(17, 'd'),

        },
        {
          userId: users[2].id,
          title: 'One-pass Compiler Primer',
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is a lot of text. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(27, 'd'),

        },
        {
          userId: users[0].id,
          title: 'I built an open-source personal assistant powered by an artificial neural network in Go',
          description: {
            blocks: [{
              key: 'fhjbh', data: {}, text: 'This is a lot of text. Some of it is in bold.', type: 'unstyled', depth: 0, entityRanges: [], inlineStyleRanges: [{ style: 'BOLD', length: 22, offset: 23 }],
            }],
            entityMap: {},
          },
          createdAt: moment().subtract(2, 'm'),

        },
      ]).then(async (posts) => {
        await Comment.bulkCreate([
          {
            text: 'Nice',
            userId: users[1].id,
            postId: posts[0].id,
            createdAt: moment().subtract(17, 'm'),
            replyComments: [
              {
                text: 'Thank you!',
                userId: users[0].id,
                postId: posts[0].id,
                createdAt: moment().subtract(17, 'm'),
              },
            ],
          },
          {
            text: 'This is my first post',
            userId: users[1].id,
            postId: posts[1].id,
            createdAt: moment().subtract(1, 'd'),
            replyComments: [
              {
                text: 'This is great. How did you do it?',
                userId: users[2].id,
                postId: posts[1].id,
                createdAt: moment().subtract(17, 'm'),
              },
              {
                text: 'By myself. And a lot of Horlicks. I am sponsored by them to be honest.',
                userId: users[1].id,
                postId: posts[1].id,
                createdAt: moment().subtract(17, 'm'),
              },
            ],
          },
          {
            text: 'Very cool',
            userId: users[0].id,
            postId: posts[1].id,
            createdAt: moment().subtract(1, 'd'),
          },
          {
            text: 'Very cool',
            userId: users[0].id,
            postId: posts[2].id,
            createdAt: moment().subtract(1, 'd'),
          },
        ], { include: { model: Comment, as: 'replyComments' } });
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = seed;
