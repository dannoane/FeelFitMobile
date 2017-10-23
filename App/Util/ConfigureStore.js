import throttle from 'lodash/throttle';
import { createStore, combineReducers } from 'redux';
import UserState from './../Reducer/UserState';
import UserPosition from './../Reducer/UserPosition';

const loadState = () => {
  return { UserState: { loggedIn: true } };
};

const saveState = (state) => {

};

const ConfigureStore = () => {

  const persistedState = loadState();
  const bikeApp = combineReducers({
    UserState: UserState,
    UserPosition: UserPosition
  });
  const store = createStore(bikeApp, persistedState);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default ConfigureStore;
