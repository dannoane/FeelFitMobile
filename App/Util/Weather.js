import _ from 'lodash';
import { store } from './Store';
import { setWeather } from './../Action';
import WeatherService from './../Service/WeatherService';

const UPDATE_INTERVAL = 1000 * 60 * 15 * 1000;
let lastUpdated = null;
let service = new WeatherService();

const Weather = async () => {

  let route = store.getState().Route;

  if (route.workoutState === 'started' && route.hasLocation) {
    if (lastUpdated === null || route.time - lastUpdated > UPDATE_INTERVAL) {
      lastUpdated = Date.now();

      let location = _.last(_.last(route.route));
      let weather = await service.getWeather(location);

      store.dispatch(setWeather(weather));
    }
  }
};

export default Weather;
