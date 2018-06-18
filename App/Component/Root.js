import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import { storePromise } from '../Util/Store';
import RootNavigator from './Navigator/RootNavigator';

export default class Root extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loaded: false
    };

    this.init();
  }

  async init() {

    this.store = await storePromise;
    this.setState({ loaded: true });
  }

  render() {

    if (!this.state.loaded) {
      return (<View></View>);
    }

    return (
      <Provider store={this.store}>
        <RootNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('FeelFit', () => Root);
