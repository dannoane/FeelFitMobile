import React, { Component } from 'react';
import { AppState, View, Switch, Alert } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';
import PushNotification from '../Util/PushNotification';
import ViewStyle from './../Style/ViewStyle';
import { addRouteSegment, setWorkoutState, togglePositionTrack } from './../Action';
import { Activity, Altitude, AveragePace, Distance, Speed, Temperature, Time } from './StatisticsComponents';
import * as Timer from './../Util/Timer';

var ws = new WebSocket('ws://feelfit.westeurope.cloudapp.azure.com:4444');

ws.onopen = () => {
  
  console.log('connected')
};

ws.onmessage = (e) => {

  console.log(e.data);
};

ws.onerror = (e) => {

  console.log(e.message);
};

ws.onclose = (e) => {

  console.log(e.code, e.reason);
};

class Statistics extends Component {

  constructor(props) {

    super(props);

    this.state = {
      appState: AppState.currentState,
    };

    this.initComponent();
  }

  initComponent() {

    Timer.init();
  }

  stopNotification() {

    PushNotification.cancelAllLocalNotifications()
  }

  sendNotification() {

    PushNotification.localNotification({
      /* Android Only Properties */
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      color: "green", // (optional) default: system default
      vibrate: false, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: true, // (optional) set whether this is an "ongoing" notification

      /* iOS and Android properties */
      title: "FeelFit", // (optional)
      message: "Workout in progress", // (required)
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      repeatType: 'time', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      repeatTime: 1000
    });
  }

  toggleWorkout() {

    if (this.props.workoutState === 'stopped' || this.props.workoutState === 'paused') {
      changeKeepAwake(true);
      this.sendNotification();

      this.props.onWorkoutStateChange('started');
      this.props.onWorkoutStart();
    }
    else {
      changeKeepAwake(false);
      this.stopNotification();
      
      this.props.onWorkoutStateChange('paused');
    }
  }

  stopWorkout() {

    changeKeepAwake(false);
    this.stopNotification();
    
    this.props.onWorkoutStateChange('stopped');
    this.props.navigation.navigate('SaveWorkout');
  }

  displayAlert() {

    Alert.alert(
      'Stop workout!',
      'Are you sure you want to stop the workout?',
      [
        {text: 'Yes', onPress: () => this.stopWorkout()},
        {text: 'No', onPress: () => console.log('')}
      ],
      {cancelable: false}
    )
  }

  render() {

    const view = new ViewStyle()
      .flex(1)
      .flexDirection('column')
      .custom({backgroundColor: '#fff'})
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
            onPress={() => this.props.workoutState !== 'stopped' ? this.displayAlert() : null} />
          <Icon
            name={this.props.workoutState === 'started' ? 'pause' : 'play'}
            color='black'
            type = 'material-community'   
            raised         
            size={30}
            onPress={() => this.toggleWorkout()} />
          <View>
            <Icon
              name='my-location'
              type='material'
              size={20} />
            <Switch
              value={this.props.track}
              onValueChange={() => this.props.onPositionTrack()} />
          </View>
        </View>
      </View>
    );
  }
}

function changeKeepAwake(shouldBeAwake) {
  if (shouldBeAwake) {
    KeepAwake.activate();
  } else {
    KeepAwake.deactivate();
  }
}

const mapStateToProps = (state) => ({
  workoutState: state.Route.get('workoutState'),
  track: state.Route.get('track')
});

const mapDispatchToProps = {
  onWorkoutStart: addRouteSegment,
  onWorkoutStateChange: setWorkoutState,
  onPositionTrack: togglePositionTrack
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
