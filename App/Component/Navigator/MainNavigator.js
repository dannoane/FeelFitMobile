import { DrawerNavigator } from 'react-navigation';
import Workout from './../Workout';

const MainNavigator = DrawerNavigator({
  Workout: { screen: Workout }
});

export default MainNavigator;
