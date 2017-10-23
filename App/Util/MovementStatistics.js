import lineDistance from '@turf/line-distance';
import * as helpers from '@turf/helpers';

export const getAltitude = (movementData) => {

  if (!movementData) {
    return 'N/A m';
  }

  return Number.parseInt(movementData.altitude) + ' m';
};

export const getMinAltitude = (movementData) => {

  return getAltitude(movementData.min(mD => mD.altitude));
};

export const getMaxAltitude = (movementData) => {

  return getAltitude(movementData.max(mD => mD.altitude))
};

export const getSpeed = (movementData) => {

  if (!movementData) {
    return 'N/A km/h';
  }

  return Number.parseInt(movementData.speed * 3.6) + ' km/h';
};

export const getMinSpeed = (movementData) => {

  return getSpeed(movementData.min(mD => mD.speed));
};

export const getMaxSpeed = (movementData) => {

  return getSpeed(movementData.max(mD => mD.speed));
};

export const getAvgSpeed = (movementData) => {

  if (movementData.isEmpty()) {
    return 'N/A km/h';
  }

  return Number.parseInt((movementData.reduce((sum, mD) => sum + mD.speed, 0) / movementData.count()) * 3.6) + ' km/h';
};

export const getDistance = (route) => {

  let segments = route.filter(seg => seg.count() > 1).map(seg => seg.map(point => [point.latitude, point.longitude])).toJS();
  let distance;

  for (segment of segments) {
    var line = helpers.lineString(segment);
    distance += lineDistance(line, 'kilometers');
  }

  if (!distance) {
    distance = 'N/A'
  }

  return distance + ' km';
};
