const axios = require('axios');

class RequestHandler {
  constructor({ request }) {
    this.request = axios.create(request);
  }
}

module.exports = RequestHandler;
