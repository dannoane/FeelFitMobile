import Rx from 'rxjs/Rx';
import { storePromise } from './Store';
import { setTime } from './../Action';

let initialized = false;
let store;

const init = async () => {

  if (!initialized) {
    
    store = await storePromise;
    initTimer();
    initialize = true;
  }
};

const initTimer = () => {

  setInterval(() => {
    let route = store.getState().Route;

    if (route.get('workoutState') === 'started') {
      let time = 0;
      
      route
        .get('timeArray')
        .forEach(t => time += (t.get('end') || Date.now()) - t.get('start'));

      time = Math.floor(time / 1000);

      store.dispatch(setTime(time));
    }
  }, 1000);
};

export { init };
