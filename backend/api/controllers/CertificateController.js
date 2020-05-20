const CFCertificate = require('../../integrations/cloudflare/certificate');

const CertificateController = () => {
  const getAll = async (req, res) => {
    try {
      const cert = new CFCertificate(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const list = await cert.getAll();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const destroy = async (req, res) => {
    try {
      const dns = new CFCertificate(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.destroy(req.params.certId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const create = async (req, res) => {
    try {
      const dns = new CFCertificate(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.create(req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    getAll,
    destroy,
    create,
  };
};

module.exports = CertificateController;
