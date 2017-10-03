import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class SignUpScreen extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {

    super(props);
    const { navigate } = this.props.navigation;
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}
