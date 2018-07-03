import axios from 'axios';
import _ from 'lodash';
import * as config from './../config';
import MotionMapper from './../Util/MotionMapper';

export default class MotionService {

    static processResponse(response) {

        let activity = response
            .Results
            .output1
            .value
            .Values;
        activity = activity
            .map(a => _.last(a))
            .map(a => {
                switch (a) {
                    case 'walking':
                        return MotionMapper.WALKING;
                    case 'running':
                        return MotionMapper.RUNNING;
                    case 'biking':
                        return MotionMapper.BIKING;
                    default:
                        return 0;
                }  
            });

        let frequencies = _.countBy(activity);
        return _.maxBy(activity, (a) => frequencies[a]);
    }

    static async classify(data) {

        let values = data
            .map(d => [
                d.accelerometer.x,
                d.accelerometer.y,
                d.accelerometer.z,
                d.gyroscope.x,
                d.gyroscope.y,
                d.gyroscope.z,
                d.magnetometer.x,
                d.magnetometer.y,
                d.magnetometer.z
            ]);

        let requestBody = {
            Inputs: {
                input1: {
                    ColumnNames: [
                        "acceleration_x",
                        "acceleration_y",
                        "acceleration_z",
                        "gyroscope_x",
                        "gyroscope_y",
                        "gyroscope_z",
                        "magnetometer_x",
                        "magnetometer_y",
                        "magnetometer_z"
                    ],
                    Values: values
                }
            },
            GlobalParameters: {}
        };

        let requestHeaders = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': config.authorization
            }
        }

        try {
            let result = await axios.post(config.classifier, requestBody, requestHeaders);
            
            return MotionService.processResponse(result.data);
        }
        catch (err) {
            if (err.response && err.response.status !== 500) {
                console.log(err.response.data);
            }

            console.log('Cannot reach web service!');
        }

        return 0;
    }
}
