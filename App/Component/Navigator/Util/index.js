import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

export const mapNavigationStateParamsToProps = (SomeComponent, extra) => {

  return class extends Component {

    render() {
      const {navigation: {state: {params}}} = this.props;
      return <SomeComponent {...params} {...this.props} {...extra} />
    }
  }
};
