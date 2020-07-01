const Sequelize = require('sequelize');

const Post = require('../models/Post');
const Teammate = require('../models/Teammate');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Tag = require('../models/Tag');
const Like = require('../models/Like');

async function get({ id, userId }) {
  const post = (await Post.findOne({
    where: Sequelize.or(
      {
        id, published: true,
      },
      {
        id, published: false, userId: userId || '',
      },
    ),
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
  title, published, description, tagId, teammateIds, userId,
}) {
  if (!teammateIds) {
    // eslint-disable-next-line no-param-reassign
    teammateIds = [userId];
  } else if (!teammateIds.includes(userId)) {
    teammateIds.unshift(userId);
  }
  // eslint-disable-next-line no-param-reassign
  teammateIds = [...new Set(teammateIds)];

  let post = await Post.create({
    title,
    published,
    description,
    tagId,
    teammates: teammateIds.map((teammateId) => ({ userId: teammateId })),
    userId,
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

module.exports = {
  createPostAndTeammates,
  update,
  get,
  destroy,
};
