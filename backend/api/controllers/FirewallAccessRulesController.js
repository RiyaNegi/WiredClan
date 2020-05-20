const CFFirewallAR = require('../../integrations/cloudflare/firewallAccessRules');

const FirewallAccessRulesController = () => {
  const getAll = async (req, res) => {
    try {
      const accessRule = new CFFirewallAR(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const list = await accessRule.getAll();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const accessRule = new CFFirewallAR(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await accessRule.edit(req.params.arId, req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const destroy = async (req, res) => {
    try {
      const accessRule = new CFFirewallAR(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await accessRule.destroy(req.params.arId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const create = async (req, res) => {
    try {
      const accessRule = new CFFirewallAR(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await accessRule.create(req.body);
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

module.exports = FirewallAccessRulesController;
