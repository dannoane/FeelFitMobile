import { connect } from 'react-redux';
import MapScreen from '../Component/Map';

const mapStateToProps = (state) => ({
  route: state.Route
});

const mapDispatchToProps = {};

const Map = connect(mapStateToProps, mapDispatchToProps)(MapScreen);
export default Map;