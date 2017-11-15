import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import ConfigureStore from '../Util/ConfigureStore';
import RootNavigator from './Navigator/RootNavigator';

const store = ConfigureStore();

export default class Root extends Component {

  render() {

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BikeAppMobile', () => Root);
