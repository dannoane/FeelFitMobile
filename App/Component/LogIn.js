import React, { Component } from 'react';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setLogInStatus, setAccessToken } from './../Action';
import ViewStyle from './../Style/ViewStyle';
import LogInService from './../Service/LogInService';

class LogIn extends Component {

  constructor(props) {

    super(props);

    this.logInService = new LogInService();
    this.state = {
      username: '',
      password: '',
      error: '',
      message: this.props.signedUp ? 'Successfully signed up!' : '',
      loading: false
    };
  }

  componentWillMount() {

    this.navigateToMainScreen();
  }

  navigateToMainScreen() {

    const { navigate } = this.props.navigation;
    if (this.props.loggedIn) {
      navigate('Main');
    }
  }

  async _logIn() {

    this.setState({loading: true});

    let { username, password } = this.state;
    let result = await this.logInService.logIn(username, password);

    if (!result.success) {
      this.setState({ username: '', password: '', error: result.message });
    }
    else {
      this.props.onLogIn(true);
      this.props.onAccessToken(result.token);
    }

    this.setState({loading: false});
    this.navigateToMainScreen();
  }

  render() {

    const { navigate } = this.props.navigation;

    const view = new ViewStyle()
      .flex(1)
      .alignItems('center')
      .build();
    const title = new ViewStyle()
      .flex(1)
      .justifyContent('flex-end')
      .build();
    const form = new ViewStyle()
      .flex(2)
      .justifyContent('center')
      .width('70%')
      .build();
    const footer = new ViewStyle()
      .flex(1)
      .justifyContent('center')
      .width('70%')
      .build();

    return (
      <View style={view}>
        <View style={title}>
          <Text h1>Log In</Text>
        </View>

        <View style={form}>
          <FormLabel>Username</FormLabel>
          <FormInput placeholder={"Enter your username"}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})} />

          <FormLabel>Password</FormLabel>
          <FormInput placeholder={"Enter your password"}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})} />

          <FormValidationMessage>{this.state.error}</FormValidationMessage>

          <Button
            raised
            icon={{name: 'login', type:'material-community'}}
            fontWeight={'bold'}
            title='Log In'
            loading={this.state.loading}
            disabled={this.state.loading}
            onPress={() => this._logIn()} />
        </View>

        <View style={footer}>
          <Button
            raised
            icon={{name: 'account-plus', type:'material-community'}}
            fontWeight={'bold'}
            title='Sign Up'
            onPress={() => { navigate('SignUp') }}>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.UserState.get('loggedIn')
});

const mapDispatchToProps = {
  onLogIn: setLogInStatus,
  onAccessToken: setAccessToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
