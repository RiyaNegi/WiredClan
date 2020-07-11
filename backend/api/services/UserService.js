/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

// import { PostService } from './index';

import Sequelize from 'sequelize';
import Post from '../models/Post';
import Teammate from '../models/Teammate';

import User from '../models/User';
import Comment from '../models/Comment';
import Tag from '../models/Tag';
import Like from '../models/Like';
import PostService from './PostService';
// import Hackathon from '../models/Hackathon';
// import PostService from './PostService';

async function get(id, currentUserId) {
  let user = await User.findOne({
    where: Sequelize.or({
      id,
    }, {
      email: id,
    }),
    include: [Teammate],
  });
  user = user.get({ plain: true });

  const postIds = user.teammates.map((teammate) => teammate.postId);
  console.log(postIds);
  delete user.teammates;
  let allPosts = await Post.findAll({
    where: { id: postIds },
    include: [Comment, Tag, Like],
  });
  allPosts = allPosts.map((post) => post.get({ plain: true }));

  let likesCount = 0;
  if (currentUserId && user.id === currentUserId) {
    user.drafts = allPosts.filter((post) => !(post.published)).map((draft) => {
      likesCount += draft.likes.length;
      return PostService.decorateListItem(draft, currentUserId);
    });
  }
  user.posts = allPosts.filter((post) => post.published).map((post) => {
    likesCount += post.likes.length;
    return PostService.decorateListItem(post, currentUserId);
  });
  user.likesCount = likesCount;
  return user;
}

async function getAll() {
  // const [users, metadata] = await sequelize.query(`
  //     select users."id", users."firstName", users."lastName", users."badges", COUNT(users."id") AS "likesCount"
  //         from users
  //           inner join likes
  //             on likes."userId" = users."id"
  //         group by users."id"
  //         ORDER BY COUNT(users."id") DESC
  //         LIMIT 5; `);

  let users = await User.findAll({ include: [{ model: Teammate, include: [{ model: Post, include: [Like] }] }] });
  users = users.map((user) => {
    let likesCount = 0;
    user = user.get({ plain: true });
    user.teammates.forEach((teammate) => {
      if (teammate.post) {
        likesCount += teammate.post.likes.length;
      }
    });

    user.likesCount = likesCount;
    delete user.teammates;
    return user;
  });
  users.sort((a, b) => b.likesCount - a.likesCount);
  // const postIds = user.teammates.map((teammate) => teammate.postId);
  // console.log(postIds);
  // delete user.teammates;
  // let allPosts = await Post.findAll({
  //   where: { id: postIds },
  //   include: [Comment, Tag, Like],
  // });
  return users.slice(0, 4);
}

export default {
  get,
  getAll,
};
