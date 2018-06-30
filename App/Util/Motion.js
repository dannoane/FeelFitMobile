import { Accelerometer, Gyroscope, Magnetometer } from 'react-native-sensors';
import Rx from 'rxjs/Rx';
import { storePromise } from './Store';
import { setActivity } from './../Action';
import MotionService from './../Service/MotionService';

let accelerationObservable = null;
let gyroscopeObservable = null;
let magnetometerObservable = null;

let subscription;
let store;

const Motion = async () => {

    store = await storePromise;
    let state = store.getState();

    if (state.Route.get('workoutState') === 'started' && !observablesAvailable()) {
        await createObservables();
        mergeObservablesAndSubscribe();
    }
    else if (state.Route.get('workoutState') !== 'started' && observablesAvailable()) {
        destroyObservables();
    }
};

function observablesAvailable() {

    return accelerationObservable !== null && gyroscopeObservable !== null && magnetometerObservable !== null;
}

async function createObservables() {

    accelerationObservable = await new Accelerometer({ updateInterval: 12000 });
    gyroscopeObservable = await new Gyroscope({ updateInterval: 12000 });
    magnetometerObservable = await new Magnetometer({ updateInterval: 12000 });
}

function mergeObservablesAndSubscribe() {

    let uberObservable = accelerationObservable
        .withLatestFrom(gyroscopeObservable, magnetometerObservable,
            (accelerometer, gyroscope, magnetometer) =>
                ({ accelerometer, gyroscope, magnetometer }));

    subscription = uberObservable
        .bufferCount(5)
        .subscribe(async (data) => {

            if (!data || data.length === 0) {
                return;
            }

            let activity = await MotionService.classify(data);
            store.dispatch(setActivity(activity));
        });
}

function destroyObservables() {

    subscription.unsubscribe();

    accelerationObservable.stop();
    gyroscopeObservable.stop();
    magnetometerObservable.stop();

    accelerationObservable = null;
    gyroscopeObservable = null;
    magnetometerObservable = null;
}

export default Motion;
