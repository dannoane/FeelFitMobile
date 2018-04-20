import throttle from 'lodash/throttle';
import { createStore, combineReducers } from 'redux';
import UserState from '../Reducer/UserState';
import Route from '../Reducer/Route';
import Geolocation from './Geolocation';
import Weather from './Weather';

const loadState = () => {
  return { UserState: { loggedIn: true } };
  //return undefined;
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

  return store;
};

export const store = ConfigureStore();
