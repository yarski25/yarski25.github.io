import axios from "axios";
import { Coords } from "../types/Coords";
import { OriginCurrent } from "../types/Current";
import { Forecast, ForecastDay, Weather } from "../types/Forecast";

const API_URL = process.env.REACT_APP_API_URL as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

// queries
const queries = new Map<string, string>();
queries.set("airQuality", "&aqi=yes");
queries.set("days", "&days=" + "14");

// endpoints
const endpoints = new Map<string, string>();
endpoints.set("current", "current.json");
endpoints.set("forecast", "forecast.json");
endpoints.set("search", "search.json");
endpoints.set("history", "history.json");
endpoints.set("marina", "marina.json");
endpoints.set("future", "future.json");
endpoints.set("timezone", "timezone.json");
endpoints.set("sports", "sports.json");
endpoints.set("astronomy", "astronomy.json");
endpoints.set("ip", "ip.json");

export default class WeatherService {
  static async getByCoords(coords: Coords) {
    const response = await axios.get<OriginCurrent>(
      API_URL +
        endpoints.get("current") +
        `?key=` +
        API_KEY +
        `&q=` +
        coords.lat +
        `,` +
        coords.lon +
        queries.get("airQuality")
    );

    return response;
  }

  static async getForecast(coords: Coords, days: string) {
    queries.set("days", "&days=" + days);
    const response = await axios.get<Weather>(
      API_URL +
        endpoints.get("forecast") +
        `?key=` +
        API_KEY +
        `&q=` +
        coords.lat +
        `,` +
        coords.lon +
        queries.get("airQuality") +
        queries.get("days")
    );

    return response;
  }

  static async getByCityName(city: string) {
    const response = await axios.get<unknown>(
      API_URL + `?key=` + API_KEY + `&q=` + city
    );

    //console.log(response.data);

    return response.data;
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
