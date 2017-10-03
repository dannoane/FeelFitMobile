import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import SignUpStyle from './../Style/SignUpStyle';

export default class SignUpScreen extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {

    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
      email: '',
    };
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={SignUpStyle.page}>
        <View style={SignUpStyle.header}>
          <Text>Sign Up</Text>
        </View>

        <View style={SignUpStyle.body}>
          <Text style={SignUpStyle.bodyElement}>Name:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            value={this.state.name}
            onChangeText={() => {}}/>

          <Text style={SignUpStyle.bodyElement}>Username:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            value={this.state.username}
            onChangeText={() => {}}/>

          <Text style={SignUpStyle.bodyElement}>Password:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={() => {}}/>

          <Text style={SignUpStyle.bodyElement}>Email:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            value={this.state.email}
            onChangeText={() => {}}/>
        </View>

        <View style={SignUpStyle.footer}>
          <Button
            title="Send"
            onPress={() => {}}>
          </Button>
        </View>
      </View>
    );
  }
}
