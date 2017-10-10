import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import LogInContainer from './../Container/LogInContainer';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';


const mapNavigationStateParamsToProps = (SomeComponent) => {
  return class extends Component {
    static navigationOptions = SomeComponent.navigationOptions;
      render() {
        const {navigation: {state: {params}}} = this.props
        return <SomeComponent {...params} {...this.props} />
    }
  }
}

const Main = DrawerNavigator({
  Home: { screen: mapNavigationStateParamsToProps(HomeScreen) }
});

const App = StackNavigator({
  LogIn: { screen: mapNavigationStateParamsToProps(LogInContainer) },
  SignUp: { screen: mapNavigationStateParamsToProps(SignUpScreen) },
  Main: { screen: mapNavigationStateParamsToProps(HomeScreen) }
},
{
  headerMode: 'none',
  navigationOptions: {
    gesturesEnabled: false
  }
});

const defaultGetStateForAction = App.router.getStateForAction;

App.router.getStateForAction = (action, state) => {

  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName == 'Main' && state.routes[state.index - 1].routeName == 'LogIn'
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    return null;
  }

  return defaultGetStateForAction(action, state);
};


export default App;
