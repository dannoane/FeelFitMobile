import { connect } from 'react-redux';
import { setCurrentPosition, addPosition, addMovementData, setWatchPosition } from './../Action';
import HomeScreen from './../Component/HomeScreen';
import * as stats from './../Util/MovementStatistics';

const mapStateToProps = (state) => ({
  currentPosition: state.UserPosition.currentPosition,
  watchPosition: state.UserPosition.watchPosition,
  route: state.UserPosition.route.toArray(),
  altitude: stats.getAltitude(state.UserPosition.movementData.last()),
  maxAltitude: stats.getMaxAltitude(state.UserPosition.movementData),
  minAltitude: stats.getMinAltitude(state.UserPosition.movementData),
  speed: stats.getSpeed(state.UserPosition.movementData.last()),
  maxSpeed: stats.getMaxSpeed(state.UserPosition.movementData),
  minSpeed: stats.getMinSpeed(state.UserPosition.movementData),
  avgSpeed: stats.getAvgSpeed(state.UserPosition.movementData),
  distance: stats.getDistance(state.UserPosition.route)
});

const mapDispatchToProps = {
  onPositionChange: setCurrentPosition,
  onNewPosition: addPosition,
  onWatchPosition: setWatchPosition,
  onMovenentData: addMovementData
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
export default HomeContainer;
