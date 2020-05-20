const Cloudflare = require('../../integrations/cloudflare/cloudflare');

const DashboardController = () => {
  const getAccounts = async (req, res) => {
    try {
      const cf = new Cloudflare(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = (await cf.getAccounts()).result.map((account) => ({
        id: account.id,
        name: account.name,
      }));
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getSSL = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const ssl = (await cf.getSSL()).result;
      return res.status(200).json(ssl);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getArgoSmartRouting = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const argo = (await cf.getArgoSmartRouting()).result;
      return res.status(200).json(argo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getFirewallPackages = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = (await cf.getFirewallPackages()).result;
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getFirewallPackageGroups = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = (await cf.getFirewallPackageGroups(req.params.packageId)).result;
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getFirewallRules = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = (await cf.getFirewallRules()).result;
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getCustomPages = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = (await cf.getCustomPages()).result;
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  return {
    getAccounts,
    getSSL,
    getArgoSmartRouting,
    getFirewallPackages,
    getFirewallPackageGroups,
    getFirewallRules,
    getCustomPages,
  };
};

module.exports = DashboardController;
