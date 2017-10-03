import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createStore } from 'redux';

import LogInStyle from './../Style/LogInStyle';


const logInReducer = (state = {}, action) => {

  switch (action.type) {
    case 'ADD_USERNAME':
      return Object.assign({}, state, { username: action.value });
    case 'ADD_PASSWORD':
      return Object.assign({}, state, { password: action.value });
    case 'ADD_ERROR':
      return { error: action.value };
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
    const { navigate } = this.props.navigation;

    this.state = { error : '' };
    logInStore.subscribe(() => me.setState({ error: logInStore.getState().error }));
  }

  render() {

    return (
      <View style={LogInStyle.page}>
        <View style={LogInStyle.header}>
          <Text>Log In</Text>
        </View>

        <View style={LogInStyle.body}>
          <Text style={LogInStyle.bodyElement}>Username:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            onChangeText={(text) => { logInStore.dispatch({ type: 'ADD_USERNAME', value: text }) }}
          />
          <Text style={LogInStyle.bodyElement}>Password:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            secureTextEntry={true}
            onChangeText={(text) => { logInStore.dispatch({ type: 'ADD_PASSWORD', value: text }) }}
          />
          <Text style={LogInStyle.bodyElement}>{this.state.error}</Text>
          <Button
            title="Log  In"
            onPress={() => {}}
          />
        </View>

        <View style={LogInStyle.footer}>
          <Button
            title="Sign Up"
            onPress={() => {}}>
          </Button>
        </View>
      </View>
    );
  }
}
