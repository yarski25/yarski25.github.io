import { Location } from "./Location";

export type Condition = {
  text: string;
  icon: string;
  code: number | string;
};

export type AirQuality = {
  co: string | number;
  no2: string | number;
  o3: string | number;
  so2: string | number;
  pm2_5: string | number;
  pm10: string | number;
  "us-epa-index": string | number;
  "gb-defra-index": string | number;
};

export type WeatherData = {
  last_updated: string;
  temp_c: number | string;
  temp_f: number | string;
  is_day: number | string;
  condition: Condition;
  wind_mph: number | string;
  wind_kph: number | string;
  wind_degree: number | string;
  wind_dir: string;
  pressure_mb: number | string;
  pressure_in: number | string;
  humidity: number | string;
  cloud: number | string;
  feelslike_c: number | string;
  feelslike_f: number | string;
  vis_km: number | string;
  vis_miles: number | string;
  uv: number | string;
  gust_mph: number | string;
  gust_kph: number | string;
  air_quality: AirQuality;
};

export type OriginCurrent = {
  location: Location;
  current: WeatherData;
};

type CustomCurrent = {
  wind_ms?: string;
};

export type Current = OriginCurrent & CustomCurrent;

// export interface Current extends OriginCurrent {
//   wind_ms?: string;
// }

// export const TestType = Object({
//   current: Object({
//     temp_c: Number,
//   }),
// });

// export type TestType = ReturnType<typeof TestType>;
