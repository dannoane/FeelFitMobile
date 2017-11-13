import { connect } from 'react-redux';
import Map from './../Component/Map';

const mapStateToProps = (state) => ({
  currentPosition: state.UserPosition.currentPosition,
  route: state.UserPosition.route.toJS()
});

const MapContainer = connect(mapStateToProps)(Map);
export default MapContainer;
