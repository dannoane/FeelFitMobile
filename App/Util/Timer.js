import { AsyncStorage } from 'react-native';
import Rx from 'rxjs/Rx';
import { storePromise } from './Store';
import { incrementTime, setTime } from './../Action';

let initialized = false;
let store;

const init = async () => {

  if (!initialized) {
    
    initTimer();
    initialize = true;
  }
};

const loadTime = async () => {

  store = await storePromise; 
  let time = 0;
  let storedTime = await AsyncStorage.getItem('@time');
  await AsyncStorage.removeItem('@time');

  if (storedTime) {
    storedTime = Number.parseInt(storedTime);
    time = computeTime(storedTime);
  }

  store.dispatch(setTime(time));
};

const storeTime = async () => {

  await AsyncStorage.setItem('@time', `${Date.now()}`);
};

const computeTime = (time) => {

  let elapsedTime = 0;
  let state = store.getState();
  let workoutState = state.Route.get('workoutState');

  if (workoutState === 'started') {
    elapsedTime = Math.floor((Date.now() - time) / 1000);
  }

  return elapsedTime;
};

const initTimer = () => {

  setInterval(() => {
    let route = store.getState().Route;

    if (route.get('workoutState') === 'started') {
      store.dispatch(incrementTime());
    }
  }, 1000);
};

export { init, loadTime, storeTime };
