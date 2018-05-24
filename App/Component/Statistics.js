import React, { Component } from 'react';
import { AppState, View, Switch } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import ViewStyle from './../Style/ViewStyle';
import { addRouteSegment, setWorkoutState } from './../Action';
import { Activity, Altitude, AveragePace, Distance, Speed, Temperature, Time } from './StatisticsComponents';
import * as Timer from './../Util/Timer';

class Statistics extends Component {

  constructor(props) {

    super(props);

    this.state = {
      appState: AppState.currentState,
    };

    this.initComponent();
  }

  async initComponent() {

    await Timer.loadTime();
    Timer.init();
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState) => {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      await Timer.loadTime();
    }
    else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      await Timer.storeTime();
    }

    this.setState({appState: nextAppState});
  }

  toggleWorkout() {

    if (this.props.workoutState === 'stopped' || this.props.workoutState === 'paused') {
      this.props.onWorkoutStateChange('started');
      this.props.onWorkoutStart();
    }
    else {
      this.props.onWorkoutStateChange('paused');
    }
  }

  stopWorkout() {

    this.props.onWorkoutStateChange('stopped');
  }

  render() {

    const view = new ViewStyle()
      .flex(1)
      .flexDirection('column')
      .build();
    const indicator = new ViewStyle()
      .flex(1)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('center')
      .build();
    const normalGrid = new ViewStyle()
      .flex(2)
      .flexDirection('row')
      .build();
    const bigGrid = new ViewStyle()
      .flex(3)
      .flexDirection('row')
      .build();
    const buttonGrid = new ViewStyle()
      .flex(2)
      .flexDirection('row')
      .alignItems('center')
      .justifyContent('space-around')
      .build();

    return (
      <View style={view}>
        <View style={normalGrid}>
          <Distance style={indicator} />
          <View style={{borderLeftWidth: 1, borderLeftColor: 'black'}}/>
          <Speed style={indicator} />
        </View>

        <Divider style={{ backgroundColor: 'black' }} />
        
        <View style={normalGrid}>
          <Altitude style={indicator} />
          <View style={{borderLeftWidth: 1, borderLeftColor: 'black'}}/>
          <Activity style={indicator} />
        </View>

        <Divider style={{ backgroundColor: 'black' }} />

        <View style={bigGrid}>
          <Time style={indicator} />
        </View>

        <Divider style={{ backgroundColor: 'black' }} />

        <View style={normalGrid}>
          <AveragePace style={indicator} />
          <View style={{borderLeftWidth: 1, borderLeftColor: 'black'}}/>    
          <Temperature style={indicator} />
        </View>

        <Divider style={{ backgroundColor: 'black' }} />

        <View style={buttonGrid}>
          <Icon
            name='stop'
            color='black'
            type='material-community'
            raised
            size={25}
            onPress={() => this.stopWorkout()} />
          <Icon
            name='play'
            color='black'
            type = 'material-community'   
            raised         
            size={30}
            onPress={() => this.toggleWorkout()} />
          <Switch
            value={false}
            onValueChange={() => console.log('ok')} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  workoutState: state.Route.get('workoutState')
});

const mapDispatchToProps = {
  onWorkoutStart: addRouteSegment,
  onWorkoutStateChange: setWorkoutState
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
