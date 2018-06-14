import lineDistance from '@turf/line-distance';
import * as helpers from '@turf/helpers';
import moment from 'moment';
import Immutable from 'immutable';

export const getCurrentPosition = (route) => {
  
  let lastSegment = route.last();
  
  if (lastSegment) {
    return lastSegment.last();
  }

  return undefined;
}

export const getAltitude = (movementData) => {

  let md = movementData.last() || {};

  return Number.parseInt(md.altitude || 0);
};

const toAltitude = (altitude) => {

  return Number.parseInt(altitude) || 0;
}

export const getMinAltitude = (movementData) => {

  let minVal = movementData
    .filter(md => md.altitude > 0)
    .minBy(md => md.altitude) || {};

  return toAltitude(minVal.altitude);
};

export const getMaxAltitude = (movementData) => {

  let maxVal = movementData
    .maxBy(md => md.altitude) || {};

  return toAltitude(maxVal.altitude);
};

const toSpeed = (speed) => {

  return ((speed * 3.6) || 0).toFixed(1);
}

export const getSpeed = (movementData) => {

  let md = movementData.last() || {};

  return toSpeed(md.speed);
};

export const getMinSpeed = (movementData) => {

  let minVal = movementData
    .filter(md => md.speed > 0)
    .minBy(md => md.speed) || {};

  return toSpeed(minVal.speed);
};

export const getMaxSpeed = (movementData) => {

  let maxVal = movementData
    .maxBy(md => md.speed) || {};

  return toSpeed(maxVal.speed);
};

export const getAvgSpeed = (movementData) => {

  if (movementData.size === 0) {
    return toSpeed();
  }

  let mdBiggerThanZero = movementData
    .filter(md => md.speed > 0);
  
  return toSpeed(mdBiggerThanZero
    .reduce((sum, md) => sum + md.speed, 0) 
    / mdBiggerThanZero.size);
};

const getDistanceRaw = (route) => {

  return (route
    .filter(seg => seg.size > 1)
    .map(seg => seg.map(point => [point.latitude, point.longitude]))
    .reduce((dist, seg) => {
      let line = helpers.lineString(seg.toJS());
      return dist + lineDistance(line, 'kilometers');
    }, 0) || 0).toFixed(2);
};

export const getDistance = (route) => {

  return getDistanceRaw(route);
};

export const getAvgPaceInSeconds = (seconds, route) => {

  let distance = Number.parseFloat(getDistanceRaw(route));

  if (!distance) {
    return 0;
  }

  return seconds / distance;
}

export const getAvgPace = (seconds, route) => {

  return `${moment.unix(getAvgPaceInSeconds(seconds, route)).format('mm:ss')}`
};

export const formatAvgPace = (seconds) => {
  
  return `${moment.unix(seconds).format('mm:ss')}`
}

export const getTime = (seconds) => {

  return moment.unix(seconds).subtract(2, 'hours').format('HH:mm:ss');
};

const partitionSegmentsByActivity = (segment) => {

  if (!segment || segment.size < 2) {
    return;
  }

  let polylines = Immutable.List();
  let polyline = [];

  for (let i = 0; i < segment.size; ++i) {
    polyline.push({
      point: [segment.get(i).latitude, segment.get(i).longitude],
      time: segment.get(i).time
    });

    if (!segment.get(i + 1)) {
      polylines = polylines.push({
        polyline,
        activity: segment.get(i).activity
      });
      polyline = [];
    } 
    else if (segment.get(i + 1).activity !== segment.get(i).activity) {
      polyline.push({
        point: [segment.get(i + 1).latitude, segment.get(i + 1).longitude],
        time: segment.get(i + 1).time
      });
      polylines = polylines.push({
        polyline,
        activity: segment.get(i).activity
      });

      polyline = [];
    }
  }

  return polylines;
}

export const partitionRouteByActivity = (route) => {

  return route
    .map(seg => partitionSegmentsByActivity(seg))
    .flatten();
};
