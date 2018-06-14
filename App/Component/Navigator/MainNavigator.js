import { DrawerNavigator } from 'react-navigation';
import Workout from './../Workout';
import SearchWorkouts from './../SearchWorkouts';
import Track from './../Track';
import MyStatistics from './../MyStatistics';

const MainNavigator = DrawerNavigator({
  Workout: { screen: Workout },
  SearchWorkouts: { screen: SearchWorkouts },
  Track: { screen: Track },
  MyStatistics: { screen: MyStatistics }
});

export default MainNavigator;
