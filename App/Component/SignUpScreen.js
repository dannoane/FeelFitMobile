import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import SignUpStyle from './../Style/SignUpStyle';
import SignUpService from './../Service/SignUpService';

export default class SignUpScreen extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {

    super(props);

    this.service = new SignUpService();
    this.state = {
      name: '',
      username: '',
      password: '',
      repassword: '',
      email: '',
    };
  }

  _signUp() {

    let { name, username, password, repassword, email } = this.state;
    let validationResult = this.service.validate({ name, username, password, repassword, email });

    if (!validationResult.valid) {
      this.setState({ error: validationResult.message });
      return;
    }

    this.setState({ error: '' });
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
            onChangeText={(text) => { this.setState({ name: text }) }}/>

          <Text style={SignUpStyle.bodyElement}>Username:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            value={this.state.username}
            onChangeText={(text) => { this.setState({ username: text }) }}/>

          <Text style={SignUpStyle.bodyElement}>Password:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }) }}/>

            <Text style={SignUpStyle.bodyElement}>Confirm Password:</Text>
            <TextInput
              style={SignUpStyle.bodyElement}
              secureTextEntry={true}
              value={this.state.repassword}
              onChangeText={(text) => { this.setState({ repassword: text }) }}/>

          <Text style={SignUpStyle.bodyElement}>Email:</Text>
          <TextInput
            style={SignUpStyle.bodyElement}
            value={this.state.email}
            keyboardType='email-address'
            onChangeText={(text) => { this.setState({ email: text }) }}/>

          <Text style={SignUpStyle.bodyElement}>{this.state.error}</Text>
        </View>

        <View style={SignUpStyle.footer}>
          <Button
            title="Send"
            onPress={() => { this._signUp() }}>
          </Button>
        </View>
      </View>
    );
  }
}
