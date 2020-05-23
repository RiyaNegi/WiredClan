const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const seed = async () => {
  await User.bulkCreate([
    {
      userName: 'random_user',
      firstName: 'Abcd',
      lastName: 'Alpha',
      imageUrl: 'https://api.adorable.io/avatars/80/random_user.png',
      email: 'abcd@gmail.com',
      password: 'password',
    },
    {
      userName: 'abcde',
      firstName: 'Abcde',
      lastName: 'Beta',
      imageUrl: 'https://api.adorable.io/avatars/80/abcde.png',
      email: 'abcde@gmail.com',
      password: 'password',
    },
    {
      userName: 'thecodersblock',
      firstName: 'Raj',
      lastName: 'Negi',
      imageUrl: 'https://api.adorable.io/avatars/80/thecodersblock.png',
      email: 'raj@gmail.com',
      password: 'password',
    },
  ], { individualHooks: true, include: { model: Post } })
    .then(async (users) => {
      await Post.bulkCreate([
        {
          userId: users[0].id,
          title:
                        "I've Been Making a Video Series about Building a 16-bit Virtual Machine. This Episode Is All about Writing a Generic Parser for the Assembly Instructions.",
          description: 'a lot of description',
        },
        {
          userId: users[1].id,
          title: 'Generators in Rust, C++20, Go, and More',
          description: 'This is something I made',
        },
        {
          userId: users[2].id,
          title: "The Colorful Game of Life - a variant of Conway's Game of Life",
          description: 'This is something I wrote',
        },
        {
          userId: users[2].id,
          title: 'Feel-O-Meter (visualize the dominant emotions in your Spotify playlists based on lyrics)',
          description: 'This is something I wrote by myself',
        },
        {
          userId: users[1].id,
          title: 'What a typical 100% Serverless Architecture looks like in AWS!',
          description: '',
        },
        {
          userId: users[2].id,
          title: 'One-pass Compiler Primer',
          description: 'How to become a great developer',
        },
        {
          userId: users[0].id,
          title: 'I built an open-source personal assistant powered by an artificial neural network in Go',
          description: 'niceeeee',
        },
      ]).then(async (posts) => {
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
