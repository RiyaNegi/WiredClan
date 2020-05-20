const CFDNS = require('../../integrations/cloudflare/dns');

const DnsController = () => {
  const getAll = async (req, res) => {
    try {
      const dns = new CFDNS(
        req.params.zoneId || process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const list = await dns.getAll();
      return res.status(200).json(list);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const edit = async (req, res) => {
    try {
      const dns = new CFDNS(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.edit(req.params.dnsId, req.body);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const destroy = async (req, res) => {
    try {
      const dns = new CFDNS(
        process.env.ZONE_ID,
        process.env.AUTH_KEY,
        process.env.EMAIL,
      );

      const result = await dns.destroy(req.params.dnsId);
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const create = async (req, res) => {
    try {
      const dns = new CFDNS(
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
    edit,
    destroy,
    create,
  };
};

module.exports = DnsController;
