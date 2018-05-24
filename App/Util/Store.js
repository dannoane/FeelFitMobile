import throttle from 'lodash/throttle';
import { createStore, combineReducers } from 'redux';
import UserState from '../Reducer/UserState';
import Route from '../Reducer/Route';
import Geolocation from './Geolocation';
import Weather from './Weather';
import Motion from './Motion';

const loadState = () => {
  return undefined;
};

const saveState = (state) => {

};

const ConfigureStore = () => {

  const persistedState = loadState();
  const bikeApp = combineReducers({
    UserState: UserState,
    Route: Route
  });
  const store = createStore(bikeApp, persistedState);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));
  store.subscribe(Geolocation);
  store.subscribe(Weather);
  store.subscribe(Motion);

  return store;
};

export const store = ConfigureStore();
