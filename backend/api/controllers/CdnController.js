const Cloudflare = require('../../integrations/cloudflare/cloudflare');

const CdnController = () => {
  const settings = async (req, res) => {
    try {
      const cf = new Cloudflare(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = await cf.createPagerule();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAllAvailablePageruleSettings = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = await cf.getAllAvailablePageruleSettings();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAllPagerules = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = await cf.getAllPagerules();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getPagerule = async (req, res) => {
    try {
      const cf = new Cloudflare(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const result = await cf.getPagerule(req.params.pageId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const editPagerule = async (req, res) => {
    try {
      const cf = new Cloudflare(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await cf.editPagerule(req.params.pageId, req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getZones = async (req, res) => {
    try {
      const cf = new Cloudflare(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );
      const list = await cf.getZones(req.params.accountId);
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    settings,
    getAllAvailablePageruleSettings,
    getAllPagerules,
    getPagerule,
    editPagerule,
    getZones,
  };
};

module.exports = CdnController;
