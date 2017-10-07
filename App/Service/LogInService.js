import axios from 'axios';

import * as config from './../config';

export default class LogInService {

  async logIn(username, password) {

    try {
      let result = await axios.post(config.api + '/api/v1/authenticate', {
          username,
          password
      });

      return result.data;
    }
    catch (err) {
      if (err.response.status !== 500) {
          return err.response.data;
      }

      return { success: false, message: 'Cannot reach server!'};
    }
  }
}
