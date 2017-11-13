import lineDistance from '@turf/line-distance';
import * as helpers from '@turf/helpers';
import moment from 'moment';

export const getAltitude = (movementData) => {

  if (!movementData) {
    return 'N/A m';
  }

  return Number.parseInt(movementData.altitude) + ' m';
};

export const getMinAltitude = (movementData) => {

  return getAltitude(movementData.filter(mD => mD.altitude > 0).minBy(mD => mD.altitude));
};

export const getMaxAltitude = (movementData) => {

  return getAltitude(movementData.filter(mD => mD.altitude > 0).maxBy(mD => mD.altitude))
};

export const getSpeed = (movementData) => {

  if (!movementData) {
    return 'N/A km/h';
  }

  return Number.parseInt(movementData.speed * 3.6) + ' km/h';
};

export const getMinSpeed = (movementData) => {

  return getSpeed(movementData.filter(mD => mD.speed > 0).minBy(mD => mD.speed));
};

export const getMaxSpeed = (movementData) => {

  return getSpeed(movementData.filter(mD => mD.speed > 0).maxBy(mD => mD.speed));
};

export const getAvgSpeed = (movementData) => {

  if (movementData.isEmpty()) {
    return 'N/A km/h';
  }

  return Number.parseInt((movementData.filter(mD => mD.speed > 0).reduce((sum, mD) => sum + mD.speed, 0) / movementData.count()) * 3.6) + ' km/h';
};

const getDistanceRaw = (route) => {

  let segments = route.filter(seg => seg.count() > 1).map(seg => seg.map(point => [point.latitude, point.longitude])).toJS();
  let distance = 0;

  for (segment of segments) {
    var line = helpers.lineString(segment);
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
}

export const getAvgPace = (seconds, route) => {

  let distance = getDistanceRaw(route);

  if (!distance) {
    return 'N/A mins / km'
  }

  return `${moment.unix(seconds / 60).subtract(2, 'hours').format('mm:ss')} / km`
}

export const getTime = (seconds) => {

  return moment.unix(seconds).subtract(2, 'hours').format('HH:mm:ss');
}
