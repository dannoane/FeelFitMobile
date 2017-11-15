import { connect } from 'react-redux';
import { setLogInStatus, setAccessToken } from './../Action';
import LogInScreen from '../Component/LogIn';

const mapStateToProps = (state) => ({
  loggedIn: state.UserState.loggedIn
});

const mapDispatchToProps = {
  onLogIn: setLogInStatus,
  onAccessToken: setAccessToken
};

const LogIn = connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
export default LogIn;
