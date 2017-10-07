import { connect } from 'react-redux';
import { setLogInStatus } from './../Action';
import LogInScreen from './../Component/LogInScreen';

const mapStateToProps = (state) => ({
  loggedId: state.loggedId
});

const mapDispatchToProps = {
  onLogIn: setLogInStatus
};

const LogInContainer = connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
export default LogInContainer;
