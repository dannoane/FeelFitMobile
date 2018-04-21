import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ViewStyle from './../../Style/ViewStyle';

export default class Speed extends Component {

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
        <Swiper>
          <View style={mainScreen}>
            <Text h2>{this.props.speed}</Text>
          </View>
          <View style={subScreen}>
            <Text h5>{this.props.minSpeed}</Text>
            <Text h5>{this.props.avgSpeed}</Text>
            <Text h5>{this.props.maxSpeed}</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}
