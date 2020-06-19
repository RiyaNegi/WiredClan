const axios = require('axios');

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
      .then((response) => {
        console.log("THE TRUTH IS", response.data.email === email);
        return (response.data.email === email);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
