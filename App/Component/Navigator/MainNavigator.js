import { DrawerNavigator } from 'react-navigation';
import WorkoutNavigator from "./WorkoutNavigator";

const MainNavigator = DrawerNavigator({
  Workout: { screen: WorkoutNavigator }
});

export default MainNavigator;