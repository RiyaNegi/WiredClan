const Cloudflare = require('./cloudflare');
const DnsModel = require('../../api/models/settings/Dns');

class Dns extends Cloudflare {
  // Sending to the frontend client
  static STANDARD_MAPPING(object) {
    return {
      id: object.id,
      zone_name: object.zone_name,
      zone_id: object.zone_id,
      name: object.name.substring(0, object.name.indexOf(object.zone_name) - 1),
      type: object.type,
      content: object.content,
      ttl: object.ttl,
      proxiable: object.proxiable,
      proxied: object.proxied,
    };
  }

  // Sending to CF
  static REV_STANDARD_MAPPING(object) {
    return {
      name: object.zone_name,
      type: object.type,
      content: object.content,
      ttl: object.ttl,
      proxied: object.proxied,
    };
  }

  async getAll() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/dns_records`)
      .then(
        (resp) => {
          DnsModel.hardReset(resp.data.result);
          return {
            sync_status: 'SUCCESS',
            records: resp.data.result.map((dns) => this.constructor.STANDARD_MAPPING(dns)),
          };
        },
        (error) => {
          console.log(error);
          return { sync_status: 'POTENTIALLY_STALE', records: DnsModel.getAll() };
        },
      );
  }

  async edit(id, body) {
    return this.request.put(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/dns_records/${id}`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }

  async destroy(id) {
    return this.request.delete(`${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}` +
      `/dns_records/${id}`)
      .then((resp) => ({ success: resp.data.success }));
  }

  async create(body) {
    return this.request.post(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/dns_records`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }
}

module.exports = Dns;
