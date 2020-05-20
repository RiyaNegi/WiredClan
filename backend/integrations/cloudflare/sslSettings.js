const Cloudflare = require('./cloudflare');

class SslSettings extends Cloudflare {
  // Sending to the frontend client
  static STANDARD_MAPPING(object) {
    return {
      ...object,
      allowed_values: ['off', 'flexible', 'full', 'strict'],
    };
  }

  // Sending to CF
  static REV_STANDARD_MAPPING(object) {
    return object;
  }

  async get() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/settings/ssl`).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }

  async edit(body) {
    return this.request.patch(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/settings/ssl/`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }
}


module.exports = SslSettings;
