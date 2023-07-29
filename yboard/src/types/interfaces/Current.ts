import { Location } from "./Location";

interface Conditions {
  text: string;
  icon: string;
  code: number;
}

interface WeatherData {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  conditions: Conditions;
}

export interface Current {
  location: Location;
  current: WeatherData;
}
