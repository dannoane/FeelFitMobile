import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from './../Style/ViewStyle';
import WorkoutModel from '../Model/Workout';
import { addRouteSegment, addPosition } from './../Action';
import WeatherService from "../Service/WeatherService";
import Time from './Statistics/Time';
import Distance from './Statistics/Distance';
import Speed from './Statistics/Speed';
import Altitude from './Statistics/Altitude';
import OtherStats from './Statistics/OtherStats';

class Statistics extends Component {

  constructor(props) {

    super(props);

    this.state = {
      workout: new WorkoutModel(),
    };
    this._initTimer();
    this._initWeather();
  }

  _initTimer() {

    setInterval(() => {
      if (this.state.workout.watchPosition) {
        this.setState(state => {
          state.workout.incrementTime();
          return state;
        });
      }
    }, 1000);
  }

  async _initWeather() {

    const sleep = (time) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    let service = new WeatherService();
    while (true) {
      if (this.state.workout.watchPosition && this.state.workout.CurrentPosition) {
        service.getWeather(this.state.workout.CurrentPosition).then((weather) => {
          this.setState(state => {
            state.workout.Temperature = weather.temp;
            return state;
          });
        });

        await sleep(10 * 60 * 1000);
      }

      await sleep(15 * 1000);
    }
  }

  componentWillUnmount() {

    navigator.geolocation.clearWatch(this.watchId);
  }

  processLocationData(locationData) {

    let { latitude, longitude, ...movementData } = locationData;

    this.setState(state => {
      state.workout.addPosition({latitude, longitude});
      state.workout.addMovementData(movementData);

      return state;
    });
    this.props.onPositionChange({latitude, longitude});
  }

  getCurrentPosition(highAccuracy = true) {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.processLocationData(position.coords);
      },
      (_) => {
        this.getCurrentPosition(!highAccuracy);
      },
      { enableHighAccuracy: highAccuracy, timeout: 20000, maximumAge: 1000 }
    );
  }

  watchPosition(highAccuracy = true) {

    if (!this.watchId) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.processLocationData(position.coords);
        },
        (_) => {
          this.watchPosition(!highAccuracy);
        },
        { enableHighAccuracy: highAccuracy, timeout: 20000, maximumAge: 1000, distanceFilter: 5 }
      );
    }
  }

  trackUser(watch) {

    if (watch) {
      this.getCurrentPosition();
      this.watchPosition();
    }
    else {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  startStop() {

    if (!this.state.workout.watchPosition) {
      this.props.onWorkoutStart();
    }

    this.setState(state => {
      state.workout.toggleWorkout();
      return state;
    });
  }

  stopWorkout() {

    this.setState(state => {
      state.workout.stopWorkout();
      return state;
    });
  }

  render() {

    const workout = this.state.workout;

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
            onPress={() => { this.startStop(); this.trackUser(!workout.watchPosition); }} />
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  onWorkoutStart: addRouteSegment,
  onPositionChange: addPosition
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
