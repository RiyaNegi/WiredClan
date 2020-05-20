const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const seed = async () => {
  await User.bulkCreate([
    {
      firstName: 'Abcd',
      lastName: 'Alpha',
      email: 'abcd@gmail.com',
      password: 'password',
    },
    {
      firstName: 'Abcde',
      lastName: 'Beta',
      email: 'abcde@gmail.com',
      password: 'password',
    },
    {
      firstName: 'Raj',
      lastName: 'Negi',
      email: 'raj@gmail.com',
      password: 'password',
    },
  ], { individualHooks: true, include: { model: Post } })
    .then(async (users) => {
      await Post.bulkCreate([
        {
          userId: users[0].id,
          title: "ABCD's project",
          description: 'a lot of description',
        },
        {
          userId: users[1].id,
          title: "ABCDE's project",
          description: 'This is something I made',
        },
        {
          userId: users[2].id,
          title: 'A random blog',
          description: 'This is something I wrote',
        },
        {
          userId: users[2].id,
          title: 'A mobile app',
          description: 'This is something I wrote by myself',
        },
        {
          userId: users[1].id,
          title: 'Wow, check this out',
          description: '',
        },
        {
          userId: users[2].id,
          title: 'Another random blog',
          description: 'How to become a great developer',
        },
        {
          userId: users[0].id,
          title: "Another of ABCD's project",
          description: 'niceeeee',
        },
      ])
        .then(async (posts) => {
          await Comment.bulkCreate([
            {
              text: 'Nice',
              userId: users[1].id,
              postId: posts[0].id,
            },
            {
              text: 'This is my first post',
              userId: users[1].id,
              postId: posts[1].id,
            },
            {
              text: 'Very cool',
              userId: users[0].id,
              postId: posts[1].id,
            },
            {
              text: 'Very cool',
              userId: users[0].id,
              postId: posts[2].id,
            },
          ]);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = seed;
