import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import ConfigureStore from './App/Util/ConfigureStore';
import App from './App/Component/App';

const store = ConfigureStore();

export default class Root extends Component {

  render() {

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BikeAppMobile', () => Root);
