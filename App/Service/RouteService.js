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
}
