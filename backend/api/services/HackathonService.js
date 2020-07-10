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
import Hackathon from '../models/Hackathon';
import PostService from './PostService';

async function allPosts({ id }) {
  const posts = await Post.findAll({ where: { hackathonId: id }, include: [Teammate] });
  return posts.map((post) => post.get({ plain: true }));
}

async function postByUser({ id }, currentUserId) {
  const posts = await allPosts({ id });
  let post = posts.find((p) =>
    p.teammates
      .find((teammate) => teammate.userId === currentUserId));
  if (!post) {
    return undefined;
  }
  post = await PostService.get({ id: post.id, userId: currentUserId });
  return post;
}

async function getAllDetails({ name, page }, currentUserId) {
  const hackathon = await Hackathon.findOne({ where: { name } });
  console.log(PostService);
  const xxx = await PostService.getAll({
    hackathonId: hackathon.id, page,
  }, currentUserId);
  const postByCurrentUser = await postByUser({ id: hackathon.id }, currentUserId);
  const result = {
    ...hackathon.get({ plain: true }),
    posts: xxx,
    postByCurrentUser,
  };
  return result;
}

export default {
  getAllDetails,
  allPosts,
  postByUser,
};
