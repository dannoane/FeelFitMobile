import { TabNavigator } from 'react-navigation';
import Workout from './../Workout';
import Map from './../Map';
import { mapNavigationStateParamsToProps } from "./Util/index";


const WorkoutNavigator = TabNavigator({
  Workout: { screen: mapNavigationStateParamsToProps(Workout) },
  Map: { screen: mapNavigationStateParamsToProps(Map) }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
});

export default WorkoutNavigator;
