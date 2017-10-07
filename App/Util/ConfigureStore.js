import throttle from 'lodash/throttle';
import { createStore } from 'redux';
import UserState from './../Reducer/UserState';

const loadState = () => {
  return {};
};

const saveState = (state) => {

};

const ConfigureStore = () => {

  const persistedState = loadState();
  const store = createStore(UserState, persistedState);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  return store;
};

export default ConfigureStore;
