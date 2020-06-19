const User = require('../models/User');
const Post = require('../models/Post');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');
const moment = require('moment');

const seed = async () => {

  await Tag.bulkCreate([
    {
      text: 'Python',
    },
    {
      text: 'C/C++',
    },
    {
      text: 'Web',
    },
    {
      text: 'Mobile',
    },
    {
      text: 'General',
    },
    {
      text: 'Data/ML',
    },
    {
      text: 'Cloud',
    },
  ]);

  await User.bulkCreate([
    {
      userName: 'random_user',
      firstName: 'Venugopal',
      lastName: 'Venkatnappamrum',
      department: 'Computer',
      college: 'I2IT',
      karma: 0,
      year: 2,
      imageUrl: 'https://api.adorable.io/avatars/80/random_user.png',
      email: 'abcd@gmail.com',
      password: 'password',
    },
    {
      userName: 'abcde',
      firstName: 'Aniket',
      lastName: 'Nigade',
      department: 'ENTC',
      college: 'I2IT',
      karma: 2,
      badges: ['Python Expert'],
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
      karma: 72,
      year: 4,
      badges: [],
      imageUrl: 'https://api.adorable.io/avatars/80/thecodersblock.png',
      email: 'raj@gmail.com',
      password: 'password',
    },
    {
      userName: 'riyanegi',
      firstName: 'Riya',
      lastName: 'Negi',
      department: 'IT',
      college: 'I2IT',
      karma: 51,
      year: 4,
      badges: ['Site Admin', 'JS Expert'],
      imageUrl: 'https://api.adorable.io/avatars/80/riya.png',
      email: 'riya@gmail.com',
      password: 'password',
    },
    // {
    //   userName: 'theOG',
    //   firstName: 'OG RAJ',
    //   lastName: 'YES',
    //   department: 'Computer',
    //   college: 'I2IT',
    //   karma: 324,
    //   year: 2,
    //   imageUrl: 'https://api.adorable.io/avatars/80/theog.png',
    //   email: 'thecodersblock@gmail.com',
    //   password: 'random_password',
    // },
  ], { individualHooks: true, include: { model: Post } })
    .then(async (users) => {
      await Post.bulkCreate([
        {
          userId: users[0].id,
          karma: 18,
          tagId: 3,
          title: "I've Been Making a Video Series about Building a 16-bit Virtual Machine.",
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(7, 'h'),
        },
        {
          userId: users[1].id,
          karma: 4,
          tagId: 3,
          title: 'Generators in Rust, C++20, Go, and More',
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(10, 'h'),

        },
        {
          userId: users[2].id,
          karma: 11,
          tagId: 4,
          title: "The Colorful Game of Life - a variant of Conway's Game of Life",
          published: false,
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(7, 'd'),

        },
        {
          userId: users[2].id,
          karma: 10,
          tagId: 2,
          title: 'Feel-O-Meter (visualize the dominant emotions in your Spotify playlists based on lyrics)',
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(17, 'd'),

        },
        {
          userId: users[1].id,
          karma: 3,
          tagId: 1,
          title: 'What a typical 100% Serverless Architecture looks like in AWS!',
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(17, 'd'),

        },
        {
          userId: users[2].id,
          karma: 0,
          tagId: 2,
          title: 'One-pass Compiler Primer',
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
          createdAt: moment().subtract(27, 'd'),

        },
        {
          userId: users[0].id,
          karma: 1,
          tagId: 2,
          title: 'I built an open-source personal assistant powered by an artificial neural network in Go',
          description: '<p>This is my first blog. <strong>AMAZING</strong>.</p>\n<p>This tool, is awesome.</p>\n<p></p>\n<div style="text-align:left;"><img src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg" alt="pic" style="height: 300px;width: 300px"/></div>\n<p></p>\n<p></p>\n',
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
