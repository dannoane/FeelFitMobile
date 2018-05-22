import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { indicatorStyle } from '../../Style/FontStyle';

export default class Distance extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={this.props.style}>
        <Icon
          name={'road-variant'}
          type={'material-community'} 
          size={55} />
        <Text style={indicatorStyle}>{this.props.distance}</Text>
      </View>
    )
  }
}
