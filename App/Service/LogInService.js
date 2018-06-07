import axios from 'axios';

import * as config from './../config';

export default class LogInService {

  async logIn(username, password) {

    try {
      let result = await axios.post(config.api + '/login', {
          username,
          password
      });

      return { success: true, token: result.headers.authorization };
    }
    catch (err) {
      if (err.response && err.response.status !== 500) {
          return err.response.data;
      }

      return { success: false, message: 'Cannot reach server!'};
    }
  }
}
