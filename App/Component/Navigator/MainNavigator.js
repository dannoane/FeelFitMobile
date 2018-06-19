import { DrawerNavigator } from 'react-navigation';
import Workout from './../Workout';
import SearchWorkouts from './../SearchWorkouts';
import Track from './../Track';
import MyStatistics from './../MyStatistics';
import LogOut from './../LogOut';

const MainNavigator = DrawerNavigator({
  Workout: { screen: Workout },
  SearchWorkouts: { screen: SearchWorkouts },
  Track: { screen: Track },
  MyStatistics: { screen: MyStatistics },
  LogOut: { screen: LogOut }
});

export default MainNavigator;
