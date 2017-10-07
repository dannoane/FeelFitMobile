import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LogInContainer from './../Container/LogInContainer';
import SignUpScreen from './SignUpScreen';
import PropTypes from 'prop-types';

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
  LogIn: { screen: mapNavigationStateParamsToProps(LogInContainer) },
  SignUp: { screen: mapNavigationStateParamsToProps(SignUpScreen) },
},
{
  headerMode: 'none'
});

export default App;
