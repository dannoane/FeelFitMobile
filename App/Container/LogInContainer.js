import { connect } from 'react-redux';
import { setLogInStatus, setAccessToken } from './../Action';
import LogInScreen from './../Component/LogInScreen';

const mapStateToProps = (state) => ({
  loggedIn: state.UserState.loggedIn
});

const mapDispatchToProps = {
  onLogIn: setLogInStatus,
  onAccessToken: setAccessToken
};

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
export default LogInContainer;
