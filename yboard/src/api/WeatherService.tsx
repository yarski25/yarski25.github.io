import axios from "axios";
import { Coords } from "../types/Coords";
import { OriginCurrent } from "../types/interfaces/Current";

const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

export default class WeatherService {
  static async getByCoords(coords: Coords) {
    const response = await axios.get<OriginCurrent>(
      API_URL + `?key=` + API_KEY + `&q=` + coords.lat + `,` + coords.lon
    );

    return response;
  }

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
