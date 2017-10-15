import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HomeStyle from './../Style/HomeStyle';
import WorkoutModel from './../Model/Workout';

export default class Workout extends Component {

  constructor(props) {

    super(props);

    this.state = {
      workout: new WorkoutModel(),
    };
    this._initTimer();
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

    return (
      <View style={HomeStyle.container}>
        <View style={HomeStyle.controllers}>
          <TouchableOpacity
            style={HomeStyle.controller}
            onPress={() => { this.startStop(); this.trackUser(!workout.watchPosition); }}>
            <Text style={HomeStyle.gridText}>{workout.watchPosition ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeStyle.controller}
            title="Stop"
            onPress={this.stopWorkout}>
            <Text style={HomeStyle.gridText}>Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>Speed: {workout.Speed}</Text>
          <Text style={HomeStyle.gridText}>Distance: {workout.Distance}</Text>
        </View>
        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>Altitude: {workout.Altitude}</Text>
          <Text style={HomeStyle.gridText}>Temperature: 28&#8451;</Text>
        </View>

        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>{workout.Time}</Text>
        </View>

        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Max speed: {workout.MaxSpeed}</Text>
          <Text style={HomeStyle.gridText}>Min speed: {workout.MinSpeed}</Text>
        </View>
        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Max altitude: {workout.MaxAltitude}</Text>
          <Text style={HomeStyle.gridText}>Min altitude: {workout.MinAltitude}</Text>
        </View>
        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Average speed: {workout.AvgSpeed}</Text>
          <Text style={HomeStyle.gridText}>Average pace: {workout.AvgPace}</Text>
        </View>
      </View>
    );
  }
}