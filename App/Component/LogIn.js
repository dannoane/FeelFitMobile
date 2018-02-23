import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import LogInStyle from './../Style/LogInStyle';
import LogInService from './../Service/LogInService';
import { connect } from 'react-redux';
import { setLogInStatus, setAccessToken } from './../Action';

class LogIn extends Component {

  constructor(props) {

    super(props);

    this.logInService = new LogInService();
    this.state = {
      username: '',
      password: '',
      error: '',
      message: this.props.signedUp ? 'Successfully signed up!' : ''
    };
  }

  componentWillMount() {

    const { navigate } = this.props.navigation;
    if (this.props.loggedIn) {
      navigate('Main');
    }
  }

  async _logIn() {

    let { username, password } = this.state;
    let result = await this.logInService.logIn(username, password);

    if (!result.success) {
      this.setState({ username: '', password: '', error: result.message });
    }
    else {
      this.props.onLogIn(true);
      this.props.onAccessToken(result.token);
    }
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={LogInStyle.page}>
        <View style={LogInStyle.header}>
          <Text>Log In</Text>
        </View>

        <View style={LogInStyle.body}>
          <Text style={LogInStyle.bodyElement}>Username:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            value={this.state.username}
            onChangeText={(text) => { this.setState({ username: text }) } }/>

          <Text style={LogInStyle.bodyElement}>Password:</Text>
          <TextInput
            style={LogInStyle.bodyElement}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text) => { this.setState({ password: text }) } }/>

          <Text style={LogInStyle.bodyElement}>{this.state.error}</Text>

          <Button
            title="Log  In"
            onPress={() => { this._logIn(); }}
          />
        </View>

        <View style={LogInStyle.footer}>
          <Button
            title="Sign Up"
            onPress={() => { navigate('SignUp') }}>
          </Button>

          <Text>{this.state.message}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.UserState.loggedIn
});

const mapDispatchToProps = {
  onLogIn: setLogInStatus,
  onAccessToken: setAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
