import { StackNavigator, NavigationActions } from 'react-navigation';
import LogIn from './../LogIn';
import SignUp from './../SignUp';
import { mapNavigationStateParamsToProps } from "./Util/index";
import MainNavigator from "./MainNavigator";

const RootNavigator = StackNavigator({
    LogIn: { screen: mapNavigationStateParamsToProps(LogIn) },
    SignUp: { screen: mapNavigationStateParamsToProps(SignUp) },
    Main: { screen: MainNavigator }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  });

const defaultGetStateForAction = RootNavigator.router.getStateForAction;
RootNavigator.router.getStateForAction = (action, state) => {

  if (
    state &&
    action.type === NavigationActions.BACK &&
    state.routes[state.index].routeName.equals('Main') && state.routes[state.index - 1].routeName.equals('LogIn')
  ) {
    return null;
  }

  return defaultGetStateForAction(action, state);
};

export default RootNavigator;
