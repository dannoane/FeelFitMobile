import React from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LogInScreen from './App/Component/LogInScreen';
import SignUpScreen from './App/Component/SignUpScreen';

const App = StackNavigator({
  LogIn: { screen: LogInScreen },
  SignUp: { screen: SignUpScreen },
},
{
  headerMode: 'none'
});

AppRegistry.registerComponent('BikeAppMobile', () => App);
