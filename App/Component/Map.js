import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { getCurrentPosition } from '../Util/MovementStatistics';
import MotionMapper from '../Util/MotionMapper';
import MapStyle from '../Style/MapStyle';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

let mapPolylineId = 0;

class Map extends React.Component {

  constructor(props) {

    super(props);

    let { width, height } = Dimensions.get('window');
    this.latitudeDelta = 0.0922;
    this.longitudeDelta = this.latitudeDelta * (width / height);
  }

  calculateRegion(coords) {

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: this.latitudeDelta,
      longitudeDelta: this.longitudeDelta
    };
  }

  currentPosition(route) {

    return getCurrentPosition(route) || { latitude: 47.051389, longitude: 21.940278 };
  }

  getColor(activity) {

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

  partitionSegmentsByActivity(segment) {

    if (!segment || segment.size < 2) {
      return;
    }

    let polylines = Immutable.List();
    let polyline = [];

    for (let i = 0; i < segment.size; ++i) {
      polyline.push(segment.get(i));

      if (!segment.get(i + 1)) {
        polylines = polylines.push({polyline, activity: segment.get(i).activity});
        polyline = [];
      }
      else if (segment.get(i + 1).activity !== segment.get(i).activity) {
        polyline.push(segment.get(i + 1));
        polylines = polylines.push({polyline, activity: segment.get(i).activity});

        polyline = [];
      }
    }

    return polylines;
  }

  mapSegmentsToPolylines(segment) {

    if (!segment) {
      return;
    }

    let color = this.getColor(segment.activity);
    mapPolylineId += 1;

    return (<MapView.Polyline
      key={mapPolylineId}
      strokeWidth={3}
      strokeColor={color}
      lineCap={'butt'}
      lineJoin={'round'}
      coordinates={segment.polyline}
      geodesic={true} />);
  }

  render() {

    const route = this.props.route;
    const coords = this.currentPosition(route);
    const region = this.calculateRegion(coords);

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

          {
            route
              .map(seg => this.partitionSegmentsByActivity(seg))
              .flatten()
              .map(seg => this.mapSegmentsToPolylines(seg))
              .toJS()
          }
        </MapView>
    );
  }
}

const mapStateToProps = (state) => ({
  route: state.Route.get('route')
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
