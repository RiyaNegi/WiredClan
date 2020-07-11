/* eslint-disable no-param-reassign */

import Sequelize from 'sequelize';
import Post from '../models/Post';
import Teammate from '../models/Teammate';

import User from '../models/User';
import Comment from '../models/Comment';
import Tag from '../models/Tag';
import Like from '../models/Like';
// eslint-disable-next-line import/no-cycle
import HackathonService from './HackathonService';

function decorateListItem(post, currentUserId) {
  return {
    ...post,
    commentsCount: post.comments.length,
    comments: undefined,
    likesCount: post.likes.length,
    likedByCurrentUser: !!currentUserId && !!post.likes.find((like) => like.userId === currentUserId),
    likes: undefined,
  };
}

async function getAll({
  search, hackathonId, page,
}, currentUserId) {
  const whereQuery = {
    published: true,
    title: { [Sequelize.Op.iLike]: `%${search || ''}%` },
  };
  if (hackathonId) {
    whereQuery.hackathonId = hackathonId;
  }
  const result = await Post.findAll({
    where: whereQuery,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [Comment, User, Tag, Like],
    limit: 20,
    offset: (parseInt(page, 10) - 1) || 0 * 20,
  }).map((post) => decorateListItem(post.get({ plain: true }, currentUserId)));
  return result;
}

async function get({ id, userId }) {
  const teammate = await Teammate.findOne({ postId: id, userId });
  if (!teammate) {
    throw new Error(`Unauthorized access in GET post: id: ${id}, userId: ${userId}`);
  }
  const post = (await Post.findOne({
    where: { id },
    include: [
      {
        model: User,
        attributes: ['userName', 'imageUrl', 'firstName', 'lastName',
          'college', 'year', 'department', 'id'],
      },
      {
        model: Tag,
      },
      {
        model: Teammate,
        include: [User],
      },
      {
        model: Like,
      },
      {
        model: Comment,
        where: { parentId: null },
        required: false,
        include: [
          {
            model: User,
            attributes: ['userName', 'imageUrl', 'firstName', 'lastName', 'college',
              'year', 'department', 'id'],
          },
          {
            model: Comment,
            as: 'replyComments',
            include: {
              model: User,
              attributes: ['userName', 'imageUrl', 'firstName', 'lastName', 'college',
                'year', 'department', 'id'],
            },
          },
        ],
      },
    ],
  })).toJSON();
  post.likedByCurrentUser = !!userId && !!post.likes.find((like) => like.userId === userId);
  post.likesCount = post.likes.length;
  delete post.likes;
  return post;
}

async function createPostAndTeammates({
  title, published, description, tagId, teammateIds, hackathonId,
}, currentUserId) {
  // return if not logged in
  if (!currentUserId) {
    throw new Error('Invalid Create API');
  }

  // Add self to team if not present
  if (!teammateIds) {
    teammateIds = [currentUserId];
  } else if (!teammateIds.includes(currentUserId)) {
    teammateIds.unshift(currentUserId);
  }
  teammateIds = [...new Set(teammateIds)];

  // Check if alreadyRegisteredPost
  if (hackathonId) {
    // const HackathonService from './HackathonService');
    const alreadyRegisteredPost = await HackathonService.postByUser({ id: hackathonId }, currentUserId);
    if (alreadyRegisteredPost) {
      throw new Error('Invalid Create API');
    }
  }

  let post = await Post.create({
    title,
    published,
    description,
    tagId,
    hackathonId,
    teammates: teammateIds.map((teammateId) => ({ userId: teammateId })),
    userId: currentUserId,
  }, { include: [Teammate] });
  post = post.get({ plain: true });
  return post;
}

async function update({
  id, title, published, description, tagId, userId,
}) {
  let post = await Post.findOne({ where: { id }, include: [Teammate] });
  if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(userId) === false) {
    return null;
  }
  post = await post.update({
    title,
    published,
    description,
    tagId,
  }, {
    returning: true,
  });

  post = post.get({ plain: true });
  return post;
}

async function destroy({ id, userId }) {
  const post = await Post.findOne({ where: { id }, include: [Teammate] });
  if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(userId) === false) {
    return null;
  }
  const result = await Post.destroy({ where: { id, userId } });
  return result;
}

export default {
  createPostAndTeammates,
  update,
  get,
  getAll,
  destroy,
  decorateListItem,
};
