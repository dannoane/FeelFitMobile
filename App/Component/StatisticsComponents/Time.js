import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getTime } from '../../Util/MovementStatistics';
import { bigIndicatorStyle } from '../../Style/FontStyle';

class Time extends Component {

  constructor(props) {
    super(props);
  }

  time() {
    return getTime(this.props.time);
  }

  render() {

    return (
      <View style={this.props.style}>
        <Icon
          name={'timer'}
          type={'material-community'} 
          size={70}
          style={{marginRight: 15}} />
        <Text style={bigIndicatorStyle}>{this.time()}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  time: state.Route.time
});

export default connect(mapStateToProps, {})(Time);
