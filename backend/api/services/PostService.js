const Post = require('../models/Post');
// const Teammate = require('../models/Teammate');
// const User = require('../models/User');
// const { ACCOUNT_STATUS: { UNVERIFIED } } = require('../config/constants');
// const { REGISTERABLE_ROLES } = require('../config/rolesAndAccess');
// require('../config/initializeDB');
// const smsService = require('./smsService');

async function create({
  title, published, description, tagId, teammateIds, userId,
}) {
  let post = await Post.create({
    title,
    published,
    description,
    tagId,
    teammateIds,
    userId,
  });
  post = post.get({ plain: true });
  post.teammateIds = teammateIds;
  return post;
}

// async function createPost(phoneNumber) {
//   return Account.query().select().where({ phone_number: phoneNumber }).resultSize()
//     .then(res => res > 0);
// }

// async function create({ phoneNumber, role }) {
//   if (!REGISTERABLE_ROLES.includes(role)) {
//     throw 'HACKER_ALERT';
//   }

//   const otp = crypto.randomBytes(20).toString('hex').substr(0, 5);
//   const sent = await smsService.sendOTP(phoneNumber);
//   if (!sent) {
//     throw 'SMS_SERVICE_DOWN';
//   }

//   if (await _exists(phoneNumber)) {
//     return Account.query().where({ phone_number: phoneNumber }).patch({ otp });
//   }

//   return Account.query().insert({
//     phone_number: phoneNumber, roles: [role], status: UNVERIFIED, otp
//   });
// }

module.exports = {
  create,
};
