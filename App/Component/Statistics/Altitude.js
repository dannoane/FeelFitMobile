import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ViewStyle from './../../Style/ViewStyle';

export default class Altitude extends Component {

  constructor(props) {
    super(props);

    this.state = {visible: false};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: true
      });
   }, 100);
  }

  render() {

    if (!this.state.visible) {
      return (<View></View>);
    }

    const mainScreen = new ViewStyle()
      .flex(1)
      .flexDirection('column')
      .alignItems('center')
      .justifyContent('center')
      .build();
    const subScreen = new ViewStyle()
      .flex(1)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('space-around')
      .build();

    return (
      <View style={this.props.style}>
        <Swiper removeClippedSubviews={false}>
          <View style={mainScreen}>
            <Text h1>{this.props.altitude}</Text>
          </View>
          <View style={subScreen}>
            <Text h4>{this.props.minAltitude}</Text>
            <Text h4>{this.props.maxAltitude}</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}
