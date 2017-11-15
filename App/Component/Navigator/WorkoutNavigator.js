import { TabNavigator } from 'react-navigation';
import Workout from '../../Container/Workout';
import Map from '../../Container/Map';
import { mapNavigationStateParamsToProps } from "./Util/index";


const WorkoutNavigator = TabNavigator({
  Workout: { screen: mapNavigationStateParamsToProps(Workout) },
  Map: { screen: mapNavigationStateParamsToProps(Map) }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
});

export default WorkoutNavigator;