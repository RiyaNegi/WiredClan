const axios = require('axios');
const RequestHandler = require('../requestHandler');

class Cloudflare {
  static BASE_URL() { return 'https://api.cloudflare.com'; }

  static STANDARD_MAPPING({ result: object, allRules }) {
    return {
      id: object.id,
      pageUrl: object.targets.map((target) => (target.constraint.value))[0],
      rules: object.actions.map((action) => ({
        ...action,
        // eslint-disable-next-line max-len
        properties: allRules.result.filter((rule) => action.id === rule.id).map((rule) => rule.properties),
      })),
      status: object.status,
      priority: object.priority,
    };
  }

  static REV_STANDARD_MAPPING(object) {
    return {
      ...(object.pageUrl) && {
        targets:
          [{
            target: 'url',
            constraint: { operator: 'matches', value: object.pageUrl },
          }],
      },
      ...object.rules && { actions: object.rules },
      priority: object.priority || 1,
      status: object.status || 'active',
    };
  }

  constructor(zoneId, authKey, email) {
    this.zoneId = zoneId;
    this.authKey = authKey;
    this.email = email;
    this.requestHandler = new RequestHandler({
      request: {
        baseURL: this.constructor.BASE_URL(),
        timeout: 30000,
        headers: {
          'x-auth-key': this.authKey,
          'x-auth-email': this.email,
        },
      },
    });
    this.request = axios.create({
      baseURL: this.constructor.BASE_URL(),
      timeout: 30000,
      headers: {
        'x-auth-key': this.authKey,
        'x-auth-email': this.email,
      },
    });
  }

  /* Dashboard APIs */
  async getAccounts() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
      '/client/v4/accounts').then((resp) => resp.data);
  }

  /* Traffic Argo Smart Routing */
  async getArgoSmartRouting() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/argo/smart_routing`).then((resp) => resp.data);
  }

  async getFirewallPackages() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/firewall/waf/packages`).then((resp) => resp.data);
  }

  async getFirewallPackageGroups(packageId) {
    return this.request.get(`${this.constructor.BASE_URL()}` +
    `/client/v4/zones/${this.zoneId}/firewall/waf/packages/${packageId}/groups`).then((resp) => resp.data);
  }

  async getFirewallRules() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/firewall/rules`).then((resp) => resp.data);
  }

  /* Custom Pages */
  async getCustomPages() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/custom_pages`).then((resp) => resp.data);
  }

  /* Pagerule APIs */
  async getAllAvailablePageruleSettings() {
    return this.request.get(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules/settings`).then((resp) => resp.data);
  }

  async getAllPagerules() {
    const allRules = await this.getAllAvailablePageruleSettings();
    return this.request.get(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules`).then((resp) =>
      // eslint-disable-next-line max-len
      (resp.data.result.map((rule) => this.constructor.STANDARD_MAPPING({ result: rule, allRules }))));
  }

  async getZones(accountId) {
    return this.request.get(`${this.constructor.BASE_URL()}` +
      '/client/v4/zones').then((resp) =>
      (resp.data.result.map((zone) => ({
        id: zone.id, name: zone.name, status: zone.status, accountId: zone.account.id,
      })).filter((zone) => accountId === zone.accountId)));
  }

  async getPagerule(pageruleId) {
    const allRules = await this.getAllAvailablePageruleSettings();
    return this.request.get(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules/${pageruleId}`).then((resp) =>
      this.constructor.STANDARD_MAPPING({ ...resp.data, allRules }));
  }

  async createPagerule(newPagerule = {
    targets:
      [{
        target: 'url',
        constraint: { operator: 'matches', value: '*petstore.codedroit.com/xyz/abcds/*' },
      }],
    actions: [{ id: 'always_online', value: 'on' }],
    priority: 1,
    status: 'active',
  }) {
    const allRules = await this.getAllAvailablePageruleSettings();
    return this.request.post(
      `${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules`,
      newPagerule,
    )
      .then((resp) => this.constructor.STANDARD_MAPPING({ ...resp.data, allRules }))
      .catch((error) => {
      // handle error
        console.log(error);
      });
  }

  async editPagerule(pageruleId, reqObject = {
    targets:
      [{
        target: 'url',
        constraint: { operator: 'matches', value: '*petstore.codedroit.com/abc/*' },
      }],
    actions: [{ id: 'always_online', value: 'on' }],
    priority: 1,
    status: 'active',
  }) {
    const allRules = await this.getAllAvailablePageruleSettings();
    return this.request.patch(
      `${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules/${pageruleId}`,
      this.constructor.REV_STANDARD_MAPPING(reqObject),
    )
      .then((resp) => this.constructor.STANDARD_MAPPING({ ...resp.data, allRules }))
      .catch((error) => {
      // handle error
        console.log(error);
      });
  }

  async deletePagerule(pageruleId) {
    const allRules = await this.getAllAvailablePageruleSettings();
    return this.request.delete(`${this.constructor.BASE_URL()}` +
      `/client/v4/zones/${this.zoneId}/pagerules/${pageruleId}`).then((resp) =>
      this.constructor.STANDARD_MAPPING({ ...resp.data, allRules }));
  }
}

module.exports = Cloudflare;
