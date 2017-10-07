import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';
import LogInStyle from './../Style/LogInStyle';
import LogInService from './../Service/LogInService';

export default class LogInScreen extends Component {

  constructor(props) {

    super(props);

    this.logInService = new LogInService();
    this.state = {
      username: '',
      password: '',
      error: '',
      message: this.props.signedUp ? 'Successfully signed up!' : ''
    };
  }

  async _logIn() {

    let { username, password } = this.state;
    let result = await this.logInService.logIn(username, password);

    if (!result.success) {
      this.setState({ 'username': '', password: '', error: result.message });
    }
    else {

    }
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={LogInStyle.page}>
        <View style={LogInStyle.header}>
          <Text>Log In</Text>
        </View>

        <View style={LogInStyle.body}>
          <Text style={LogInStyle.bodyElement}>Username:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            value={this.state.username}
            onChangeText={(text) => { this.setState({ username: text }) } }/>

          <Text style={LogInStyle.bodyElement}>Password:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }) } }/>

          <Text style={LogInStyle.bodyElement}>{this.state.error}</Text>

          <Button
            title="Log  In"
            onPress={() => { this._logIn(); }}
          />
        </View>

        <View style={LogInStyle.footer}>
          <Button
            title="Sign Up"
            onPress={() => { navigate('SignUp') }}>
          </Button>

          <Text>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}
