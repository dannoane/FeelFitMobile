import { storePromise } from './Store';
import { addPosition, addMovementData, incrementTime } from './../Action';
import RouteService from '../Service/RouteService';

let watchId = null;
let routeService = new RouteService();

const Geolocation = async () => {

  let store = await storePromise;
  let route = store.getState().Route;

  if (route.get('workoutState') === 'started' && watchId === null) {
    watchId = navigator.geolocation.watchPosition((data) => {

      let { latitude, longitude, ...movementData } = data.coords;

      if (movementData.accuracy <= 30) {

        if (store.getState().Route.get('track')) {
          routeService.sendMyPosition({
            location: [latitude, longitude],
            activity: store.getState().Route.get('activity')
          }, store.getState().UserState.get('accessToken'));
        }
        
        store.dispatch(addPosition({ latitude, longitude }));
        store.dispatch(addMovementData(movementData));
      }
    },
    (err) => {
      console.log(err.code, err.message);
    },
    {
      enableHighAccuracy: true,
    });
  }
  else if (route.get('workoutState') !== 'started' && watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
};

export default Geolocation;
