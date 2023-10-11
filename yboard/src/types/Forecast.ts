import { AirQuality, Condition, Current, WeatherData } from "./Current";

type Day = {
  maxtemp_c: number | string;
  mintemp_c: number | string;
  avgtemp_c: number | string;
  maxwind_kph: number | string;
  totalprecip_mm: number | string;
  totalsnow_cm: number | string;
  avgvis_km: number | string;
  avghumidity: number | string;
  daily_will_it_rain: number | string;
  daily_chance_of_rain: number | string;
  daily_will_it_snow: number | string;
  daily_chance_of_snow: number | string;
  condition: Condition;
  uv: number | string;
  air_quality: AirQuality;
};

type CustomHour = {
  windchill_c: number | string;
  windchill_f: number | string;
  heatindex_c: number | string;
  heatindex_f: number | string;
  dewpoint_c: number | string;
  dewpoint_f: number | string;
  will_it_rain: number | string;
  chance_of_rain: number | string;
  will_it_snow: number | string;
  chance_of_snow: number | string;
};

export type Hour = WeatherData & CustomHour;

type Astro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
  is_moon_up: number | string;
  is_sun_up: number | string;
};

export type ForecastDay = {
  date: string;
  day: Day;
  astro: Astro;
  hour: Array<Hour>;
};

type ForecastBase = {
  forecastday: Array<ForecastDay>;
};

export type Forecast = {
  forecast: ForecastBase;
};

export type Weather = Current & Forecast;
