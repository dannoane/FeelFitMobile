import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import HomeStyle from './../Style/HomeStyle';

export default class Home extends React.Component {

  constructor(props) {

    super(props);

    this._initTimer();
  }

  _initTimer() {

    setInterval(() => {
      if (this.props.watchPosition) {
        this.props.onTimeTick();
      }
    }, 1000);
  }

  componentWillUnmount() {

    navigator.geolocation.clearWatch(this.watchId);
  }

  processLocationData(locationData) {

    let { latitude, longitude, ...movementData } = locationData;

    this.props.onPositionChange({latitude, longitude});
    this.props.onNewPosition({ latitude, longitude });
    this.props.onMovenentData(movementData);
  }

  getCurrentPosition(highAccuracy = true) {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.processLocationData(position.coords);
      },
      (error) => {
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
        (error) => {
          this.watchPosition(!highAccuracy);
        },
        { enableHighAccuracy: highAccuracy, timeout: 20000, maximumAge: 1000, distanceFilter: 5 }
      );
    }
  }

  trackUser(watch, highAccuracy = true) {

    if (watch) {
      this.getCurrentPosition();
      this.watchPosition();
    }
    else {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  render() {

    return (
      <View style={HomeStyle.container}>
        <View style={HomeStyle.controllers}>
          <TouchableOpacity
            style={HomeStyle.controller}
            onPress={() => { this.props.onWatchPosition(!this.props.watchPosition); this.trackUser(!this.props.watchPosition); }}
          >
            <Text style={HomeStyle.gridText}>{this.props.watchPosition ? "Pause" : "Start"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={HomeStyle.controller}
            title="Stop"
            onPress={() => { this.props.onWatchPosition(false) }}
          >
            <Text style={HomeStyle.gridText}>Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>Speed: {this.props.speed}</Text>
          <Text style={HomeStyle.gridText}>Distance: {this.props.distance}</Text>
        </View>
        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>Altitude: {this.props.altitude}</Text>
          <Text style={HomeStyle.gridText}>Temperature: 28&#8451;</Text>
        </View>

        <View style={HomeStyle.grid}>
          <Text style={HomeStyle.gridText}>{this.props.time}</Text>
        </View>

        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Max speed: {this.props.maxSpeed}</Text>
          <Text style={HomeStyle.gridText}>Min speed: {this.props.minSpeed}</Text>
        </View>
        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Max altitude: {this.props.maxAltitude}</Text>
          <Text style={HomeStyle.gridText}>Min altitude: {this.props.minAltitude}</Text>
        </View>
        <View style={HomeStyle.smallGrid}>
          <Text style={HomeStyle.gridText}>Average speed: {this.props.avgSpeed}</Text>
          <Text style={HomeStyle.gridText}>Average pace: {this.props.avgPace}</Text>
        </View>
      </View>
    );
  }
}
