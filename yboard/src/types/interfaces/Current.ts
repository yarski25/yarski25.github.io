import { Location } from "./Location";

interface Condition {
  text: string;
  icon: string;
  code: number | string;
}

interface WeatherData {
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
}

export interface OriginCurrent {
  location: Location;
  current: WeatherData;
}

export interface Current extends OriginCurrent {
  wind_ms?: string;
}
