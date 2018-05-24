import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getDistance } from '../../Util/MovementStatistics';
import { indicatorStyle } from '../../Style/FontStyle';

class Distance extends Component {

  constructor(props) {
    super(props);
  }

  distance() {

    return getDistance(this.props.route);
  }

  render() {

    return (
      <View style={this.props.style}>
        <Icon
          name={'road-variant'}
          type={'material-community'} 
          size={55} />
        <Text style={indicatorStyle}>{this.distance()}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  route: state.Route.get('route')
});

export default connect(mapStateToProps, {})(Distance);
