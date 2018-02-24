import { DrawerNavigator } from 'react-navigation';
import WorkoutNavigator from "./WorkoutNavigator";
import Workout from './../Workout';

const MainNavigator = DrawerNavigator({
  Workout: { screen: Workout }
});

export default MainNavigator;
