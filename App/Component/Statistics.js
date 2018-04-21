import React, { Component } from 'react';
import { AppState, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from './../Style/ViewStyle';
import WorkoutModel from '../Model/Workout';
import { addRouteSegment, setWorkoutState } from './../Action';
import Activity from './Statistics/Activity';
import Time from './Statistics/Time';
import Distance from './Statistics/Distance';
import Speed from './Statistics/Speed';
import Altitude from './Statistics/Altitude';
import OtherStats from './Statistics/OtherStats';
import * as Timer from './../Util/Timer';

class Statistics extends Component {

  constructor(props) {

    super(props);

    this.state = {
      appState: AppState.currentState,
    };

    this.initComponent();
  }

  async initComponent() {

    await Timer.loadTime();
    Timer.init();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState) => {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      await Timer.loadTime();
    }
    else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      await Timer.storeTime();
    }

    this.setState({appState: nextAppState});
  }

  toggleWorkout() {

    if (this.props.workoutState === 'stopped') {
      this.props.onWorkoutStateChange('started');
      this.props.onWorkoutStart();
    }
    else {
      this.props.onWorkoutStateChange('paused');
    }
  }

  stopWorkout() {

    this.props.onWorkoutStateChange('stopped');
  }

  render() {

    const { time, workoutState, route, movementData, weather, activity } = this.props;
    const workout = new WorkoutModel(time, workoutState, route, movementData, weather, activity);

    const view = new ViewStyle()
      .flex(1)
      .flexDirection('column')
      .build();
    const indicator = new ViewStyle()
      .flex(3)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('center')
      .build();
    const buttons = new ViewStyle()
      .flex(1)
      .flexDirection('row')
      .alignItems('flex-start')
      .justifyContent('space-around')
      .build();

    return (
      <View style={view}>
        <Activity
          style={indicator}
          activity={workout.Activity} />

        <Time
          style={indicator}
          time={workout.Time} />

        <Distance
          style={indicator}
          distance={workout.Distance} />

        <Speed
          style={indicator}
          speed={workout.Speed}
          minSpeed={workout.MinSpeed}
          avgSpeed={workout.AvgSpeed}
          maxSpeed={workout.MaxSpeed} />

        <Altitude
          style={indicator}
          altitude={workout.Altitude}
          minAltitude={workout.MinAltitude}
          maxAltitude={workout.MaxAltitude} />

        <OtherStats
          style={indicator}
          avgPace={workout.AvgPace}
          temperature={workout.Temperature} />

        <View style={buttons}>
          <Button
            raised
            rounded
            icon={{name: 'play', style: { marginRight: 0 }, type:'material-community'}}
            containerViewStyle={{borderRadius: 50}}
            onPress={() => this.toggleWorkout() } />
          <Button
            raised
            rounded
            icon={{name: 'stop', style: { marginRight: 0 }, type:'material-community'}}
            containerViewStyle={{borderRadius: 50}}
            onPress={() => this.stopWorkout() } />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.Route.route,
  time: state.Route.time,
  workoutState: state.Route.workoutState,
  movementData: state.Route.movementData,
  weather: state.Route.weather,
  activity: state.Route.activity
});

const mapDispatchToProps = {
  onWorkoutStart: addRouteSegment,
  onWorkoutStateChange: setWorkoutState
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
