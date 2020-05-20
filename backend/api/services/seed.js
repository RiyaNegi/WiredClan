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
          UserId: users[0].id,
          title: "ABCD's project",
          description: 'a lot of description',
        },
        {
          UserId: users[1].id,
          title: "ABCDE's project",
          description: 'This is something I made',
        },
        {
          UserId: users[2].id,
          title: 'A random blog',
          description: 'This is something I wrote',
        },
        {
          UserId: users[2].id,
          title: 'A mobile app',
          description: 'This is something I wrote by myself',
        },
        {
          UserId: users[1].id,
          title: 'Wow, check this out',
          description: '',
        },
        {
          UserId: users[2].id,
          title: 'Another random blog',
          description: 'How to become a great developer',
        },
        {
          UserId: users[0].id,
          title: "Another of ABCD's project",
          description: 'niceeeee',
        },
      ])
        .then(async (posts) => {
          await Comment.bulkCreate([
            {
              text: 'Nice',
              UserId: users[1].id,
              PostId: posts[0].id,
            },
            {
              text: 'This is my first post',
              UserId: users[1].id,
              PostId: posts[1].id,
            },
            {
              text: 'Very cool',
              UserId: users[0].id,
              PostId: posts[1].id,
            },
            {
              text: 'Very cool',
              UserId: users[0].id,
              PostId: posts[2].id,
            },
          ]);
        });
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = seed;
