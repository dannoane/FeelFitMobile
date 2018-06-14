import axios from 'axios';

import * as config from './../config';

export default class LogInService {

    async saveWorkout(workout, token) {

        try {
            let result = await axios.post(config.api + '/workouts', workout, {
                headers: { Authorization: token }
            });

            return { success: true };
        } 
        catch (err) {
            if (err.response && err.response.status !== 500) {
                return err.response.data;
            }

            return {
                success: false,
                message: 'Cannot reach server!'
            };
        }
    }

    async search(options, token) {

        try {
            let result = await axios.get(config.api + `/workouts/find?username=${options.username}&latitude=${options.location.latitude}&longitude=${options.location.longitude}&radius=${options.radius}&activity=${options.activity}`, {
                headers: { Authorization: token }
            });

            return { success: true, data: result.data };
        } 
        catch (err) {
            if (err.response && err.response.status !== 500) {
                return { success: false, message: err.response.data };
            }

            return {
                success: false,
                message: 'Cannot reach server!'
            };
        }
    }

    async sendMyPosition(userPosition, token) {

        try {
            let result = await axios.post(config.api + '/userPositions', userPosition, {
                headers: { Authorization: token }
            });

            return { success: true };
        } 
        catch (err) {
            if (err.response && err.response.status !== 500) {
                return err.response.data;
            }

            return {
                success: false,
                message: 'Cannot reach server!'
            };
        }
    }

    async getUsersLocation(options, token) {

        try {
            let result = await axios.get(config.api + `/userPositions?latitude=${options.latitude}&longitude=${options.longitude}`, {
                headers: { Authorization: token }
            });

            return { success: true, data: result.data._embedded.userPositions };
        } 
        catch (err) {
            if (err.response && err.response.status !== 500) {
                return { success: false, message: err.response.data };
            }

            return {
                success: false,
                message: 'Cannot reach server!'
            };
        }
    }

    async getStatistics(options, token) {

        try {
            let result = await axios.get(config.api + `/workouts/stats?startDate=${options.startDate}&endDate=${options.endDate}`, {
                headers: { Authorization: token }
            });

            return { success: true, data: result.data };
        } 
        catch (err) {
            if (err.response && err.response.status !== 500) {
                return { success: false, message: err.response.data };
            }

            return {
                success: false,
                message: 'Cannot reach server!'
            };
        }
    }
}
