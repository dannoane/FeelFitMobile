import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { getSpeed, getMinSpeed, getAvgSpeed, getMaxSpeed } from '../../Util/MovementStatistics';
import ViewStyle from '../../Style/ViewStyle';
import { indicatorStyle } from '../../Style/FontStyle';

class Speed extends Component {

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

  speed() {
    return getSpeed(this.props.movementData);
  }

  minSpeed() {
    return getMinSpeed(this.props.movementData);
  }

  avgSpeed() {
    return getAvgSpeed(this.props.movementData);
  }

  maxSpeed() {
    return getMaxSpeed(this.props.movementData);
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
        <Swiper>
          <View style={screen}>
            <Icon
              name={'speedometer'}
              type={'material-community'} 
              size={50}
              style={{marginRight: 15}} />
            <Text style={indicatorStyle}>{this.speed()}</Text>
          </View>
          
          <View style={screen}>
            <Icon
              name={'long-arrow-down'}
              type={'font-awesome'} 
              size={40} />
            <Icon
              name={'speedometer'}
              type={'material-community'} 
              size={50} />
            <Text style={indicatorStyle}>{this.minSpeed()}</Text>
          </View>
          
          <View style={screen}>
            <Icon
              name={'long-arrow-right'}
              type={'font-awesome'} 
              size={40} />
            <Icon
              name={'speedometer'}
              type={'material-community'} 
              size={50} />
            <Text style={indicatorStyle}>{this.avgSpeed()}</Text>
          </View>
          
          <View style={screen}>
            <Icon
              name={'long-arrow-up'}
              type={'font-awesome'} 
              size={40} />
            <Icon
              name={'speedometer'}
              type={'material-community'} 
              size={50} />
            <Text style={indicatorStyle}>{this.maxSpeed()}</Text>
          </View>
        </Swiper>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  movementData: state.Route.movementData
});

export default connect(mapStateToProps, {})(Speed);
