import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';
import { connect } from 'react-redux';
import MotionMapper from '../Util/MotionMapper';
import MapStyle from '../Style/MapStyle';

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

  _getCurrentPosition(route) {

    return _.last(_.last(route)) || { latitude: 47.051389, longitude: 21.940278 };
  }

  _getColor(activity) {

    let color;

    switch (activity) {
      case MotionMapper.WALKING:
        color = '#ed445e';
        break;
      case MotionMapper.RUNNING:
        color = '#5562d6';
        break;
      case MotionMapper.BIKING:
        color = '#5eed7b';
        break;
      default:
        color = '#000000';
        break;
    }

    return color;
  }

  _partitionSegmentsByActivity(segment) {

    if (!segment || segment.length < 2) {
      return;
    }

    let polylines = [];
    let polyline = [];

    for (let i = 0; i < segment.length; ++i) {
      polyline.push(segment[i]);

      if (segment[i + 1].activity !== segment[i].activity) {
        polyline.push(segment[i + 1]);
        polylines.push({ polyine, activity: segment[i].activity });

        polyline = [];
      }
    }

    if (polyline.length > 0) {
      polylines.push({ polyine, activity: _.last(segment).activity });
    }

    return polylines;
  }

  _mapSegmentsToPolylines(segment) {

    if (!segment) {
      return;
    }

    let color = this._getColor(segment.activity);

    return (<MapView.Polyline
      strokeWidth={3}
      strokeColor={color}
      coordinates={segment.polyine}
      geodesic={true} />);
  }

  render() {

    const route = this.props.route;
    const coords = this._getCurrentPosition(route);
    const region = this._calculateRegion(coords);

    return (
        <MapView
          style={styles.map}
          customMapStyle={MapStyle}
          minZoomLevel={10}
          region={region}
          showsTraffic={true}
          showsScale={true}
          showsCompas={true}
          pitchEnabled={false}>

          <MapView.Marker
            coordinate={coords}/>

          {_.map(_.flatten(_.map(route, this._partitionSegmentsByActivity)), this._mapSegmentsToPolylines)}
        </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.Route.route
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
