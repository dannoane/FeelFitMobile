import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import ViewStyle from '../../Style/ViewStyle';
import { indicatorStyle } from '../../Style/FontStyle';


export default class Temperature extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={this.props.style}>
          <Icon
            name={'thermometer-lines'}
            type={'material-community'} 
            size={45} />
          <Text style={indicatorStyle}>{this.props.temperature}</Text>
      </View>
    )
  }
}
