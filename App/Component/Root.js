import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../Util/Store';
import RootNavigator from './Navigator/RootNavigator';

export default class Root extends Component {

  render() {

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('FeelFit', () => Root);
