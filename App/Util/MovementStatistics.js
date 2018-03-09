import lineDistance from '@turf/line-distance';
import * as helpers from '@turf/helpers';
import moment from 'moment';
import _ from 'lodash';

export const getAltitude = (movementData) => {

  if (!movementData) {
    return 'N/A m';
  }

  return Number.parseInt(movementData.altitude) + ' m';
};

export const getMinAltitude = (movementData) => {

  return getAltitude(
    _.minBy(_.filter(movementData, mD => mD.altitude > 0), mD => mD.altitude)
  );
};

export const getMaxAltitude = (movementData) => {

  return getAltitude(
    _.maxBy(_.filter(movementData, mD => mD.altitude > 0), mD => mD.altitude)
  );
};

export const getSpeed = (movementData) => {

  if (!movementData) {
    return 'N/A km/h';
  }

  return (movementData.speed * 3.6).toFixed(1) + ' km/h';
};

export const getMinSpeed = (movementData) => {

  return getSpeed(
    _.minBy(_.filter(movementData, mD => mD.speed > 0), mD => mD.speed)
  );
};

export const getMaxSpeed = (movementData) => {

  return getSpeed(
    _.maxBy(_.filter(movementData, mD => mD.speed > 0), mD => mD.speed)
  );
};

export const getAvgSpeed = (movementData) => {

  if (movementData.length === 0) {
    return 'N/A km/h';
  }

  return (_.reduce(_.filter(movementData, mD => mD.speed > 0), (sum, mD) => sum + mD.speed, 0) / (movementData.length * 3.6)).toFixed(1) + ' km/h';
};

const getDistanceRaw = (route) => {

  let segments = route.filter(seg => seg.length > 1).map(seg => seg.map(point => [point.latitude, point.longitude]));
  let distance = 0;

  for (segment of segments) {
    let line = helpers.lineString(segment);
    distance += lineDistance(line, 'kilometers');
  }

  return distance.toFixed(2);
};

export const getDistance = (route) => {

  let distance = getDistanceRaw(route);

  if (!distance) {
    distance = 'N/A'
  }

  return distance + ' km';
};

export const getAvgPace = (seconds, route) => {

  let distance = getDistanceRaw(route);

  if (!distance) {
    return 'N/A mins / km'
  }

  return `${moment.unix(seconds / 60).subtract(2, 'hours').format('mm:ss')} / km`
};

export const getTime = (seconds) => {

  return moment.unix(seconds).subtract(2, 'hours').format('HH:mm:ss');
};
