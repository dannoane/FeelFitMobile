import { AsyncStorage } from 'react-native';
import Rx from 'rxjs/Rx';
import { store } from './Store';
import { incrementTime, setTime } from './../Action';

let initialized = false;

const init = () => {

  if (!initialized) {
    initTimer();

    initialize = true;
  }
};

const loadTime = async () => {

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
  let workoutState = state.Route.workoutState;

  if (workoutState === 'started') {
    elapsedTime = Math.floor((Date.now() - time) / 1000);
  }

  return elapsedTime;
};

const initTimer = () => {

  Rx.Observable
    .interval(1000)
    .filter(_ => {
      let state = store.getState();
      return state.Route.workoutState === 'started';
    })
    .subscribe(_ => store.dispatch(incrementTime()));
};

export { init, loadTime, storeTime };
