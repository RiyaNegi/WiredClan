
const HackathonService = require('../services/HackathonService');
const logger = require('../../logger');

const HackathonController = () => {
  const get = async (req, res) => {
    try {
      const result = await HackathonService.getAllDetails({ name: req.params.name }, req.session.userId);
      return res.status(200).json(result);
    } catch (err) {
      logger.error(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    get,
  };
};

module.exports = HackathonController;
