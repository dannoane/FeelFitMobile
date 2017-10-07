import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import LogInScreen from './App/Component/LogInScreen';
import SignUpScreen from './App/Component/SignUpScreen';

const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends Component {
    static navigationOptions = SomeComponent.navigationOptions;
      render() {
        const {navigation: {state: {params}}} = this.props
        return <SomeComponent {...params} {...this.props} />
    }
  }
}

const App = StackNavigator({
  LogIn: { screen: mapNavigationStateParamsToProps(LogInScreen) },
  SignUp: { screen: mapNavigationStateParamsToProps(SignUpScreen) },
},
{
  headerMode: 'none'
});

AppRegistry.registerComponent('BikeAppMobile', () => App);
