import { connect } from 'react-redux';
import { addRouteSegment, addPosition } from './../Action';
import WorkoutScreen from '../Component/Workout';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  onWorkoutStart: addRouteSegment,
  onPositionChange: addPosition
};

const Workout = connect(mapStateToProps, mapDispatchToProps)(WorkoutScreen);
export default Workout;