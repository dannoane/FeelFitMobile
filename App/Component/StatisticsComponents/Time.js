import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { bigIndicatorStyle } from '../../Style/FontStyle';

export default class Time extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={this.props.style}>
        <Icon
          name={'timer'}
          type={'material-community'} 
          size={70}
          style={{marginRight: 15}} />
        <Text style={bigIndicatorStyle}>{this.props.time}</Text>
      </View>
    )
  }
}
