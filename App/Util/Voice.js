import Tts from 'react-native-tts';
import moment from 'moment';
import { storePromise } from './Store';
import { getDistance, getAvgPaceInSeconds } from './MovementStatistics';

let notifiedStart = false;
let notifiedStop = false;
let lastKm = 0;

const Voice = async () => {

    let store = await storePromise;
    let route = store.getState().Route;
    
    if (route.get('workoutState') === 'started' && !notifiedStart) {
        speak('Workout started!');
        notifiedStart = true;
        notifiedStop = false;
    }
    else if (route.get('workoutState') !== 'started' & !notifiedStop) {
        speak('Workout stopped!');
        notifiedStart = false;
        notifiedStop = true;
    }

    let distance = Number.parseFloat(getDistance(route.get('route')));
    if (distance >= lastKm + 1 && route.get('workoutState') === 'started') {
        lastKm += 1;

        let time = moment.unix(route.get('time')).subtract(2, 'hours');
        let hours = time.hours();
        let minutes = time.minutes();
        let seconds = time.seconds();

        let avgPace = moment.unix(getAvgPaceInSeconds(route.get('time'), route.get('route')));
        let minutesPerKm = avgPace.minutes();
        let secondsPerKm = avgPace.seconds();
        
        let toSpeak = `Distance: ${distance} kilometers.`;
        toSpeak += `Time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        toSpeak += `Average time per kilometer: ${minutesPerKm} minutes, ${secondsPerKm} seconds`;

        speak(toSpeak);
    }
};

const speak = (toSpeak) => {

    Tts.getInitStatus().then(() => {
        Tts.setDucking(true);
        Tts.setDefaultRate(0.4);
        Tts.speak(toSpeak);
    });
}

export default Voice;