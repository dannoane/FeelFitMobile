import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getAvgPace } from '../../Util/MovementStatistics';
import ViewStyle from '../../Style/ViewStyle';
import { indicatorStyle } from '../../Style/FontStyle';


class AveragePace extends Component {

  constructor(props) {
    super(props);
  }

  avgPace() {
    return getAvgPace(this.props.time, this.props.route);
  }

  render() {

    return (
      <View style={this.props.style}>
          <Icon
            name={'timer-sand'}
            type={'material-community'} 
            size={45} />
          <Text style={indicatorStyle}>{this.avgPace()}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  route: state.Route.route,
  time: state.Route.time
});

export default connect(mapStateToProps, {})(AveragePace);
