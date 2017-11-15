import * as stats from './../Util/MovementStatistics';
import _ from 'lodash';

export default class Workout {

    constructor() {

        this.watchPosition = false;
        this.route = [];
        this.movementData = [];
        this.time = 0;
    }


    stopWorkout() {
        this.watchPosition = false;
    }

    toggleWorkout() {

      this.watchPosition = !this.watchPosition;
      this.addRouteSegment();
    }

    addRouteSegment() {

        if (this.watchPosition) {
            this.route.push([]);
        }
    }

    addPosition(position) {
        this.route[this.route.length - 1].push(position);
    }

    addMovementData(movementData) {
        this.movementData.push(movementData);
    }

    incrementTime() {
        this.time += 1;
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
}