import Storage from './../Util/Storage';
import axios from 'axios';

import * as config from './../config';

export default class LogInService {

  async logIn(username, password) {

    try {
      let result = await axios.post(config.api + '/api/v1/authenticate', {
          username: username,
          password: password,
      });

      return result;
    }
    catch (err) {
      return { success: false, message: 'Cannot reach server!'};
    }
  }
}
