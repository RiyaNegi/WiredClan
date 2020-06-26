const axios = require('axios');
const logger = require('../../logger');

module.exports = class Google {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static verifyLogin({ accessToken, email }) {
    return axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {
      params: {
        access_token: accessToken,
      },
    })
      .then((response) => (response.data.email === email))
      .catch((err) => {
        logger.error(err);
      });
  }
};
