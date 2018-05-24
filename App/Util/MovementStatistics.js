import lineDistance from '@turf/line-distance';
import * as helpers from '@turf/helpers';
import moment from 'moment';
import _ from 'lodash';

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

export const getAvgPace = (seconds, route) => {

  let distance = getDistanceRaw(route);

  if (!distance) {
    return '00:00';
  }

  return `${moment.unix(seconds / 60).subtract(2, 'hours').format('mm:ss')}`
};

export const getTime = (seconds) => {

  return moment.unix(seconds).subtract(2, 'hours').format('HH:mm:ss');
};
