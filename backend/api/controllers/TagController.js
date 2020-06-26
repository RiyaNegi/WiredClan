
const Tag = require('../models/Tag');
const logger = require('../../logger');

const TagController = () => {
  const getAll = async (req, res) => {
    try {
      const result = await Tag.findAll();
      return res.status(200).json(result);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
  };
};

module.exports = TagController;
