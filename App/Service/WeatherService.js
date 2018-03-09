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
      result = processResult(result.data);
    }
    catch (err) {
      console.log(err.message);
    }

    return result;
  }
}

const processResult = (result) => {

  return {
    temperature: result.main.temp,
    humidity: result.main.humidity,
    pressure: result.main.pressure,
    sunrise: result.sys.sunrise,
    sunset: result.sys.sunset,
    weather: result.weather.map(w => w.description)
  };
}
