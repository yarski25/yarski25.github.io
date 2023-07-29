import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

export default class WeatherService {
  static async getByCityName(city: string) {
    const response = await axios.get<any>(
      API_URL + `?key=` + API_KEY + `&q=` + city
    );

    return response;
  }

  //   static async getByLatLon(lat: string, lon: string) {
  //     const response = await axios.get<any>(
  //       API_URL +
  //         `?lat={lat}&lon={lon}&units=metric&exclude=hourly,daily&appid=` +
  //         API_KEY
  //     );

  //     return response;
  //   }
}
