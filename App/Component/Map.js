import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

class Map extends React.Component {

  constructor(props) {

    super(props);

    let { width, height } = Dimensions.get('window');
    this.latitudeDelta = 0.0922;
    this.longitudeDelta = this.latitudeDelta * (width / height);
  }

  _calculateRegion(coords) {

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta
    };
  }

  render() {

    const route = this.props.route;
    const coords = _.last(_.last(route)) || {latitude: 47.051389, longitude: 21.940278};
    const region = this._calculateRegion(coords);

    return (
        <MapView
          style={styles.map}>

          <MapView.Marker
            coordinate={coords}/>

          {route.map((segment, index) => {
            if (segment.length < 2) {
              return;
            }

            return <MapView.Polyline
              key={`${index}`}
              strokeWidth={3}
              strokeColor={'#008efd'}
              coordinates={segment}
              geodesic={true} />
          })}
        </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.Route
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
