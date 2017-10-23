import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export default class Map extends React.Component {

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

    const coords = this.props.currentPosition;
    const region = this._calculateRegion(coords);
    const route = this.props.route;

    return (
        <MapView
          style={styles.map}
          region={region}>

          <MapView.Marker
            coordinate={coords}/>

          {route.map(segment => {
            <MapView.Polyline
              strokeWidth={3}
              strokeColor={'#008efd'}
              coordinates={segment.toArray()}
              geodesic={true}/>
          })}
        </MapView>
    );
  }
}
