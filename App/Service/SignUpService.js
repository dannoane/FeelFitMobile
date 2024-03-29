import axios from 'axios';

import * as config from './../config';

export default class SignUpService {

  _validateName(name) {

    return /^[a-zA-Z ]{3,100}$/.test(name);
  }

  _validateUsername(username) {

    return /^[a-zA-Z1-9]{3,100}$/.test(username);
  }

  _validatePassword(password, repassword) {

    return password.length >= 6 && password === repassword;
  }

  _validateEmail(email) {

    return /.+@.+\..+/.test(email);
  }

  validate(user) {

    if (!this._validateName(user.name)) {
      return {
        valid: false,
        message: 'The name must contain only letters (and spaces)'
      };
    }

    if (!this._validateUsername(user.username)) {
      return {
        valid: false,
        message: 'The username must contain only letters and digits'
      };
    }

    if (!this._validatePassword(user.password, user.repassword)) {
      return {
        valid: false,
        message: 'The passwords must match and be at least 6 characters long'
      }
    }

    if (!this._validateEmail(user.email)) {
      return {
        valid: false,
        message: 'The email must be valid'
      }
    }

    return { valid: true };
  }

  async signUp (user) {

    try {
      let result = await axios.post(config.api + '/users', user);

      return { success: true };
    }
    catch (err) {
      if (err.response.status !== 500) {
          return err.response.data;
      }

      return { success: false, message: 'Cannot reach server!' };
    }
  }
}
