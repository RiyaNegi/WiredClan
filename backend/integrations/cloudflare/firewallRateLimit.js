const Cloudflare = require('./cloudflare');

class FirewallRateLimit extends Cloudflare {
  // Sending to the frontend client
  static STANDARD_MAPPING(object) {
    return object;
  }

  // Sending to CF
  static REV_STANDARD_MAPPING(object) {
    return object;
  }

  async getAll() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/rate_limits`)
      .then((resp) => resp.data.result.map((dns) => this.constructor.STANDARD_MAPPING(dns)));
  }

  async edit(id, body) {
    return this.request.put(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/rate_limits/${id}`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }

  async destroy(id) {
    return this.request.delete(`${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}` +
      `/rate_limits/${id}`)
      .then((resp) => ({ success: resp.data.success }));
  }

  async create(body) {
    return this.request.post(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/rate_limits`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }
}


module.exports = FirewallRateLimit;
