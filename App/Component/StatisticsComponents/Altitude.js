import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { getAltitude, getMinAltitude, getMaxAltitude } from '../../Util/MovementStatistics';
import ViewStyle from '../../Style/ViewStyle';
import { indicatorStyle } from '../../Style/FontStyle';


class Altitude extends Component {

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

  altitude() {
    return getAltitude(this.props.movementData);
  }

  minAltitude() {
    return getMinAltitude(this.props.movementData);
  }

  maxAltitude() {
    return getMaxAltitude(this.props.movementData);
  }

  render() {

    if (!this.state.visible) {
      return (<View></View>);
    }

    const screen = new ViewStyle()
      .flex(1)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('center')
      .build();

    return (
      <View style={this.props.style}>
        <Swiper removeClippedSubviews={false}>
          <View style={screen}>
            <Icon
              name={'mountains'}
              type={'foundation'} 
              size={60} />
            <Text style={indicatorStyle}>{this.altitude()}</Text>
          </View>

          <View style={screen}>
            <Icon
              name={'long-arrow-down'}
              type={'font-awesome'} 
              size={40} />
            <Icon
              name={'mountains'}
              type={'foundation'} 
              size={60} />
            <Text style={indicatorStyle}>{this.minAltitude()}</Text>
          </View>
          
          <View style={screen}>
            <Icon
              name={'long-arrow-up'}
              type={'font-awesome'} 
              size={40} />
            <Icon
              name={'mountains'}
              type={'foundation'} 
              size={60} />
            <Text style={indicatorStyle}>{this.maxAltitude()}</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  movementData: state.Route.movementData
});

export default connect(mapStateToProps, {})(Altitude);
