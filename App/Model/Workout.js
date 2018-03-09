import * as stats from './../Util/MovementStatistics';
import _ from 'lodash';

export default class Workout {

    constructor(time, workoutState, route, movementData, weather) {

        this.time = time;
        this.workoutState = workoutState;
        this.route = route;
        this.movementData = movementData;
        this.weather = weather;
    }


    get CurrentPosition() {
        return _.last(_.last(this.route));
    }

    get Altitude() {
        return stats.getAltitude(_.last(this.movementData));
    }

    get MaxAltitude() {
        return stats.getMaxAltitude(this.movementData);
    }

    get MinAltitude() {
        return stats.getMinAltitude(this.movementData);
    }

    get Speed() {
        return stats.getSpeed(_.last(this.movementData));
    }

    get MaxSpeed() {
        return stats.getMaxSpeed(this.movementData);
    }

    get MinSpeed() {
        return stats.getMinSpeed(this.movementData);
    }

    get AvgSpeed() {
        return stats.getAvgSpeed(this.movementData);
    }

    get Distance() {
        return stats.getDistance(this.route);
    }

    get Time() {
        return stats.getTime(this.time);
    }

    get AvgPace() {
        return stats.getAvgPace(this.time, this.route);
    }


    set Temperature(temperature) {
        this.weather.temperature = temperature;
    }

    get Temperature() {
        return `${this.weather.temperature || 'N/A'} ℃`;
    }
}
