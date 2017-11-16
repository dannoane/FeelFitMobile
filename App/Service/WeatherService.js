import axios from 'axios';

export default class WeatherService {

  constructor() {

    this.apiKey = '002f084459b1a3d07e50370259ec22b9';
  }

  async getWeather(coordinates) {

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${this.apiKey}`;
    let result = {};

    try {
      result = await axios.get(url);
      result = JSON.parse(result);
    }
    catch (err) {
      // TODO: handle error
    }

    return result.data.main;
  }
}