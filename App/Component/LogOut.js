import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { resetWorkout, clearGlobal, clearUser } from './../Action';

class LogOut extends Component {

  constructor(props) {

    super(props);
  }

  logOut() {

    Alert.alert(
        'Log Out',
        'Are you sure you want to log out?', 
        [{
            text: 'No',
            onPress: () => this.props.navigation.navigate('Workout'),
            style: 'cancel'
        },
        {
            text: 'Yes',
            onPress: () => {
                this.props.onClearUser();
                this.props.onClearRoute();
                this.props.onClearGlobal();

                this.props.navigation.navigate('LogIn');
            }
        }], 
        {
            cancelable: false
        }
    );
  }

  render() {

    this.logOut();

    return (<View></View>);
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  onClearUser: clearUser,
  onClearRoute: resetWorkout,
  onClearGlobal: clearGlobal
};

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);
