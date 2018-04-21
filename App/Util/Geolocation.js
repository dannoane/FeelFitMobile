import { store } from './Store';
import { addPosition, addMovementData } from './../Action';

let watchId = null;
const Geolocation = () => {

  let route = store.getState().Route;

  if (route.workoutState === 'started' && watchId === null) {
    watchId = navigator.geolocation.watchPosition((data) => {

      let { latitude, longitude, ...movementData } = data.coords;

      if (movementData.accuracy <= 30) {
        store.dispatch(addPosition({ latitude, longitude }));
        store.dispatch(addMovementData(movementData));
      }
    },
      (err) => {
        console.log(err.code, err.message);
      },
      {
        timeout: 20000,
        enableHighAccuracy: true,
      });
  }
  else if (route.workoutState !== 'started' && watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};

export default Geolocation;
