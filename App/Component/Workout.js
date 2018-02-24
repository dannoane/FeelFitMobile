import React, { Component } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import Statistics from './Statistics';
import Map from './Map';
import ViewStyle from './../Style/ViewStyle';

export default class Workout extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const screen = new ViewStyle()
      .flex(1)
      .build();

    return (
      <Swiper showsButtons={true}>
        <View style={screen}>
          <Statistics />
        </View>
        <View style={screen}>
          <Map />
        </View>
      </Swiper>
    );
  }
}
