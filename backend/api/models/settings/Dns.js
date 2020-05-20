const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const { DB_STATUS } = require('../../../config/constants');

const Dns = sequelize.define('Dns', {
  cf_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  zone_id: {
    type: Sequelize.STRING,
  },
  record: {
    type: Sequelize.JSONB,
  },
  status: {
    type: Sequelize.STRING,
  },
  new_record: {
    type: Sequelize.JSONB,
  },
}, { tableName: 'dns' });

Dns.hardReset = (records) => {
  Dns.destroy({ where: { zone_id: records[0].zone_id } });
  Dns.bulkCreate(records.map((record) => ({
    cf_id: record.id,
    zone_id: record.zone_id,
    status: DB_STATUS.IN_SYNC,
    record,
  })));
};

module.exports = Dns;
