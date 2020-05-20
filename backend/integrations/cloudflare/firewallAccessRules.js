const Cloudflare = require('./cloudflare');

class FirewallAccessRules extends Cloudflare {
  // Sending to the frontend client
  static STANDARD_MAPPING(object) {
    return {
      id: object.id,
      paused: object.paused,
      modified_on: object.modified_on,
      allowed_modes: object.allowed_modes,
      notes: object.notes,
      configuration: object.configuration.value,
      applies_on: object.scope.name,
      mode: object.mode,
    };
  }

  // Sending to CF
  static REV_STANDARD_MAPPING(object) {
    return object;
  }

  async getAll() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/firewall/access_rules/rules`)
      .then((resp) => resp.data.result.map((dns) => this.constructor.STANDARD_MAPPING(dns)));
  }

  async edit(id, body) {
    return this.request.patch(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/firewall/access_rules/rules/${id}`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }

  async destroy(id) {
    return this.request.delete(`${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}` +
      `/firewall/access_rules/rules/${id}`)
      .then((resp) => ({ success: resp.data.success }));
  }

  async create(body) {
    return this.request.post(
      `${this.constructor.BASE_URL()}/client/v4/zones/${this.zoneId}/firewall/access_rules/rules`,
      this.constructor.REV_STANDARD_MAPPING(body),
    ).then((resp) => this.constructor.STANDARD_MAPPING(resp.data.result));
  }
}

module.exports = FirewallAccessRules;
