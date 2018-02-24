import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import ViewStyle from './../../Style/ViewStyle';

export default class Distance extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const view = new ViewStyle()
      .flex(1)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('space-around')
      .build();

    return (
      <View style={this.props.style}>
        <View style={view}>
          <Text h3>{this.props.avgPace}</Text>
          <Text h3>{this.props.temperature}</Text>
        </View>
      </View>
    )
  }
}
