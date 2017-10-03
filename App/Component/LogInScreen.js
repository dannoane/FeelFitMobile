import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createStore } from 'redux';

import LogInStyle from './../Style/LogInStyle';
import LogInService from './../Service/LogInService';


const logInReducer = (state = {}, action) => {

  switch (action.type) {
    case 'ADD_USERNAME':
      return Object.assign({}, state, { username: action.value });
    case 'ADD_PASSWORD':
      return Object.assign({}, state, { password: action.value });
    case 'ADD_ERROR':
      return { username: '', password: '', error: action.value };
    default:
      return state;
  }
};

const logInStore = createStore(logInReducer);

export default class LogInScreen extends Component {

  static navigationOptions = {
    title: 'Log In',
  };

  constructor(props) {

    super(props);

    const me = this;

    this.logInService = new LogInService();
    this.state = { username: '', password: '', error: '' };
    logInStore.subscribe(() => me.setState(logInStore.getState()));
  }

  async logIn() {

    let result = await this.logInService.logIn(
      logInStore.getState().username,
      logInStore.getState().password
    );

    if (!result.success) {
      logInStore.dispatch({ type: 'ADD_ERROR', value: result.message });
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
            onChangeText={(text) => { logInStore.dispatch({ type: 'ADD_USERNAME', value: text }) } }/>

          <Text style={LogInStyle.bodyElement}>Password:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => { logInStore.dispatch({ type: 'ADD_PASSWORD', value: text }) } }/>

          <Text style={LogInStyle.bodyElement}>{this.state.error}</Text>

          <Button
            title="Log  In"
            onPress={() => { this.logIn(); }}
          />
        </View>

        <View style={LogInStyle.footer}>
          <Button
            title="Sign Up"
            onPress={() => { navigate('SignUp') }}>
          </Button>
        </View>
      </View>
    );
  }
}
