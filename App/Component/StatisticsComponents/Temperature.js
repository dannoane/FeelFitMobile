import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from '../../Style/ViewStyle';
import { indicatorStyle } from '../../Style/FontStyle';


class Temperature extends Component {

  constructor(props) {
    super(props);
  }

  temperature() {
    return this.props.weather.temperature;
  }

  render() {

    return (
      <View style={this.props.style}>
          <Icon
            name={'thermometer-lines'}
            type={'material-community'} 
            size={45} />
          <Text style={indicatorStyle}>{this.temperature() || 0}°</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  weather: state.Route.weather
});

export default connect(mapStateToProps, {})(Temperature);
