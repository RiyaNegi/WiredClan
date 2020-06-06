const privateRoutes = {
  // Account routes
  'GET /account': 'AccountController.get',
  'PATCH /account': 'AccountController.update',

  // User routes
  'GET /users/:id': 'UserController.get',

  // Posts routes
  'GET /posts': 'PostController.getAll',
  'GET /posts/:id': 'PostController.get',
  'POST /posts': 'PostController.create',
  'POST /posts/:id/': 'PostController.edit',
  'POST /posts/:postId/comments': 'PostController.createComment',
  'POST /posts/:postId/comments/:id': 'PostController.createComment',
  'DELETE /posts/:postId/comments/:id': 'PostController.deleteComment',

  // Dashboard routes
  'GET /accounts': 'DashboardController.getAccounts',
  'GET /accounts/:accountId/zones': 'CdnController.getZones',
  // DNS routes
  'GET /zones/:zoneId/dns': 'DnsController.getAll',
  'POST /zones/:zoneId/dns/:dnsId': 'DnsController.edit',
  'POST /zones/:zoneId/dns': 'DnsController.create',
  'DELETE /zones/:zoneId/dns/:dnsId': 'DnsController.destroy',

  'GET /zones/:zoneId/ssl/certificates': 'CertificateController.getAll',
  'POST /zones/:zoneId/ssl/certificates': 'CertificateController.create',
  'DELETE /zones/:zoneId/ssl/certificates/:certId': 'CertificateController.destroy',

  // Firewall Access Rules routes FirewallAccessRulesController
  'GET /zones/:zoneId/firewall/access_rules': 'FirewallAccessRulesController.getAll',
  'POST /zones/:zoneId/firewall/access_rules': 'FirewallAccessRulesController.create',
  'DELETE /zones/:zoneId/firewall/access_rules/:arId': 'FirewallAccessRulesController.destroy',
  'PATCH /zones/:zoneId/firewall/access_rules/:arId': 'FirewallAccessRulesController.edit',

  // Firewall Access Rules routes FirewallRateLimitController
  'GET /zones/:zoneId/firewall/rate_limits': 'FirewallRateLimitController.getAll',
  'POST /zones/:zoneId/firewall/rate_limits': 'FirewallRateLimitController.create',
  'DELETE /zones/:zoneId/firewall/rate_limits/:rateId': 'FirewallRateLimitController.destroy',
  'PUT /zones/:zoneId/firewall/rate_limits/:rateId': 'FirewallRateLimitController.edit',

  // SSL Settings routes
  'GET /zones/:zoneId/ssl': 'SslSettingsController.get',
  'PATCH /zones/:zoneId/ssl': 'SslSettingsController.edit',

  'GET /zones/:zoneId/traffic/argo/smart_routing': 'DashboardController.getArgoSmartRouting',
  'GET /zones/:zoneId/firewall/waf/packages': 'DashboardController.getFirewallPackages',
  'GET /zones/:zoneId/firewall/waf/packages/:packageId/groups': 'DashboardController.getFirewallPackageGroups',
  'GET /zones/:zoneId/firewall/rules': 'DashboardController.getFirewallRules',
  'GET /zones/:zoneId/custom_pages': 'DashboardController.getCustomPages',

  // Pagerule routes
  'GET /zones/:zoneId/pagerules': 'CdnController.getAllPagerules',
  'GET /zones/:zoneId/pagerules/settings': 'CdnController.getAllAvailablePageruleSettings',
  'GET /pagerules/:pageId': 'CdnController.getPagerule',
  'POST /zones/:zoneId/pagerules/:pageId': 'CdnController.editPagerule',
};

module.exports = privateRoutes;
