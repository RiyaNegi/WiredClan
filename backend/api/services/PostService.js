/* eslint-disable no-plusplus */
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

// import logger from '../../logger.js';

// function decorateListItem(post, currentUserId) {
//   return {
//     ...post,
//     commentsCount: post.comments.length,
//     comments: undefined,
//     likesCount: post.likes.length,
//     likedByCurrentUser: !!currentUserId && !!post.likes.find((like) => like.userId === currentUserId),
//     likes: undefined,
//   };
// }

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue),
            costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function optimizedDecorateListItem(post, currentUserId, comments, likes, hackathonId) {
  const likesCount = likes.filter((obj) => {
    if (hackathonId) {
      return obj.postId === post.id
        && obj.user.viaGoogle
        && ['I2IT', 'International institute of information technology', 'I2it'].find((college) => obj.user.college && similarity(college, obj.user.college) > 0.6);
    }
    return obj.postId === post.id;
  }).length;

  return {
    ...post,
    commentsCount: comments.filter((obj) => obj.postId === post.id).length,
    comments: undefined,
    likesCount,
    likedByCurrentUser: !!currentUserId && !!likes.find((like) => like.postId === post.id && like.userId === currentUserId),
    likes: undefined,
  };
}

async function getAll({
  search, hackathonId, tagId, page, limit,
}, currentUserId) {
  const whereQuery = {
    published: true,
    title: { [Sequelize.Op.iLike]: `%${search || ''}%` },
  };
  if (hackathonId) {
    whereQuery.hackathonId = hackathonId;
  }
  if (tagId) {
    whereQuery.tagId = tagId;
  }

  // limit = parseInt(limit, 10);
  limit = limit && parseInt(limit, 10) < 10 ? limit : 10;
  const result = await Post.findAll({
    attributes: { exclude: ['description'] },
    where: whereQuery,
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [User, Tag],
    limit,
    offset: ((parseInt(page, 10) - 1) || 0) * limit,
  });

  const comments = await Comment.findAll();
  const likes = await Like.findAll({ include: [User] });

  return result.map((post) => optimizedDecorateListItem(post.get({ plain: true }), currentUserId, comments, likes, hackathonId));
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
    ],
  })).toJSON();

  post.likedByCurrentUser = !!userId && !!post.likes.find((like) => like.userId === userId);
  post.likesCount = post.likes.length;
  delete post.likes;
  const comments = await Comment.findAll({
    where: { postId: post.id, parentId: null },
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
  });

  post.comments = comments.map((comment) => comment.get({ plain: true }));
  return post;
}

async function createPostAndTeammates({
  title, published, description, tagId, teammateIds, hackathonId, ideaCode,
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
    ideaCode,
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

async function destroy(id, currentUserId) {
  const post = await Post.findOne({ where: { id }, include: [Teammate] });
  if (post.get({ plain: true }).teammates.map((teammate) => teammate.userId).includes(currentUserId) === false) {
    return null;
  }
  // Second parameter to ensure only owner can delete the file?
  const result = await Post.destroy({ where: { id, userId: currentUserId } });
  return result;
}

export default {
  createPostAndTeammates,
  update,
  get,
  getAll,
  destroy,
  // decorateListItem,
  optimizedDecorateListItem,
};
