import { AsyncStorage } from 'react-native';
import throttle from 'lodash/throttle';
import { createStore, combineReducers } from 'redux';
import Immutable from 'immutable';
import UserState, { UserRecord } from '../Reducer/UserState';
import Route, { RouteRecord } from '../Reducer/Route';
import Global, { GlobalRecord } from '../Reducer/Global';
import Geolocation from './Geolocation';
import Weather from './Weather';
import Motion from './Motion';

const loadState = async () => {
  
  try {
    let state = await AsyncStorage.getItem('@FeelFit:state');
    state = JSON.parse(state);

    if (state !== null) {
      state.UserState = new UserRecord(state.UserState);
      state.Route.route = Immutable.List(state.Route.route).map(seg => Immutable.List(seg));
      state.Route.movementData = Immutable.List(state.Route.movementData);
      state.Route = new RouteRecord(state.Route);
      state.Global = new GlobalRecord(state.Global);

      return state;
    }
    else {
      return undefined;
    }
  }
  catch (err) {
    console.warn(err);
  }
};

const saveState = async (state) => {

  try {
    await AsyncStorage.setItem('@FeelFit:state', JSON.stringify(state));
  }
  catch (err) {
    console.warn(err);
  }
};

const ConfigureStore = async () => {

  const persistedState = await loadState();
  const bikeApp = combineReducers({
    UserState: UserState,
    Route: Route,
    Global: Global
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

export const storePromise = ConfigureStore();
