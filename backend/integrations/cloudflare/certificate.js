const Cloudflare = require('./cloudflare');

class Certificate extends Cloudflare {
  // Sending to the frontend client
  static STANDARD_MAPPING(object) {
    return {
      id: object.id,
      hosts: object.hosts,
      type: object.type,
      ceritificates: object.certificates.length,
      status: object.status,
    };
  }

  // Sending to CF
  static REV_STANDARD_MAPPING(object) {
    return {
      ...object,
    };
  }

  constructor(...args) {
    super(...args);
    this.request.defaults.timeout = 15000; // TODO: Check this.
  }

  async getAll() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/ssl/certificate_packs`)
      .then((resp) => resp.data.result.map((cert) => this.constructor.STANDARD_MAPPING(cert)));
  }

  async destroy(id) {
    return this.request.delete(`${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}` +
      `/ssl/certificate_packs/${id}`)
      .then((resp) => ({ success: resp.data.success }));
  }

  async create(body) {
    return this.request.post(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/ssl/certificate_packs`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }
}


module.exports = Certificate;
