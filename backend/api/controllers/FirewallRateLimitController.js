const CFFirewallRL = require('../../integrations/cloudflare/firewallRateLimit');

const FirewallRateLimitController = () => {
  const getAll = async (req, res) => {
    try {
      const rateLimit = new CFFirewallRL(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const list = await rateLimit.getAll();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const rateLimit = new CFFirewallRL(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await rateLimit.edit(req.params.rateId, req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const rateLimit = new CFFirewallRL(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await rateLimit.destroy(req.params.rateId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const create = async (req, res) => {
    try {
      const rateLimit = new CFFirewallRL(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await rateLimit.create(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    edit,
    destroy,
    create,
  };
};

module.exports = FirewallRateLimitController;
