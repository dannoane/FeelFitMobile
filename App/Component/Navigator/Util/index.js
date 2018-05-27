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

export const resetNavigation = (navigation, targetRoute) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: targetRoute
      }),
    ],
  });
  navigation.dispatch(resetAction);
};