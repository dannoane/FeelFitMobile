import React, { Component } from 'react';
import { Text, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { View } from 'react-native';
import ViewStyle from './../Style/ViewStyle';
import SignUpService from './../Service/SignUpService';

export default class SignUpScreen extends Component {

  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {

    super(props);

    this.service = new SignUpService();
    this.state = {
      name: '',
      username: '',
      password: '',
      repassword: '',
      email: '',
      error: '',
      loading: false
    };
  }

  async _signUp() {

    this.setState({loading: true});

    let { name, username, password, repassword, email } = this.state;
    let validationResult = this.service.validate({ name, username, password, repassword, email });

    if (!validationResult.valid) {
      this.setState({ error: validationResult.message });
    }
    else {
      this.setState({ error: '' });

      let result = await this.service.signUp({ name, username, password, email });
      if (result.success) {
        this.props.navigation.navigate('LogIn', { signedUp: true });
      }
      else {
        this.setState({ error: result.message });
      }
    }

    this.setState({loading: false});
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
      .flex(4)
      .justifyContent('center')
      .width('70%')
      .build();

    return (
      <View style={view}>
        <View style={title}>
          <Text h1 style={{color: 'black'}}>Sign Up</Text>
        </View>

        <View style={form}>
          <FormLabel labelStyle={{color: 'black'}}>Name</FormLabel>
          <FormInput placeholder={"Enter your name"}
            inputStyle={{color: 'black'}}
            value={this.state.name}
            onChangeText={(name) => this.setState({name})} />

          <FormLabel labelStyle={{color: 'black'}}>Username</FormLabel>
          <FormInput placeholder={"Enter your username"}
            inputStyle={{color: 'black'}}
            value={this.state.username}
            onChangeText={(username) => this.setState({username})} />

          <FormLabel labelStyle={{color: 'black'}}>Password</FormLabel>
          <FormInput placeholder={"Enter your password"}
            inputStyle={{color: 'black'}}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.setState({password})} />

          <FormLabel labelStyle={{color: 'black'}}>Confirm password</FormLabel>
          <FormInput placeholder={"Reenter your password"}
            inputStyle={{color: 'black'}}
            secureTextEntry={true}
            value={this.state.repassword}
            onChangeText={(repassword) => this.setState({repassword})} />

          <FormLabel labelStyle={{color: 'black'}}>Email</FormLabel>
          <FormInput placeholder={"Enter your email"}
            inputStyle={{color: 'black'}}
            value={this.state.email}
            onChangeText={(email) => this.setState({email})} />

          <FormValidationMessage>{this.state.error}</FormValidationMessage>

          <Button
            raised
            icon={{name: 'account-plus', type:'material-community'}}
            backgroundColor='black'
            fontWeight={'bold'}
            title='Sign Up'
            loading={this.state.loading}
            disabled={this.state.loading}
            onPress={() => this._signUp()} />
        </View>
      </View>
    );
  }
}
