const CFSSL = require('../../integrations/cloudflare/sslSettings');

const SslSettingsController = () => {
  const get = async (req, res) => {
    try {
      const ssl = new CFSSL(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await ssl.get();
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const ssl = new CFSSL(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await ssl.edit(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    get,
    edit,
  };
};

module.exports = SslSettingsController;
