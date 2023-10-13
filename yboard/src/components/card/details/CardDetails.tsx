import { PropsWithChildren } from "react";
import wind from "../../../assets/wind.webp";
import pm10 from "../../../assets/PM10.webp";
import pm25 from "../../../assets/PM25.webp";
import co from "../../../assets/CO.webp";
import o3 from "../../../assets/O3.webp";
import no2 from "../../../assets/NO2.webp";
import so2 from "../../../assets/SO2.webp";
import pressure from "../../../assets/pressure.webp";
import uv from "../../../assets/uv.webp";
import Item from "../../ui/Item/Item";
import { Weather } from "../../../types/Forecast";
import { DeepPartial } from "../../../types/custom/DeepPartial";
import { Stack } from "@mui/material";

type CardDetailsProps = {
  day: number;
  hour: number;
  data?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const hPaTommHg = (hPa: string) => {
  return (3 * Number(hPa)) / 4;
};

const evaluatePM25 = (value: number) => {
  // evaluates concentration per 24 hours
  const level1 = 12,
    level2 = 35.4,
    level3 = 55.4,
    level4 = 150.4,
    level5 = 250.4,
    level6 = 350.4,
    level7 = 500.4;

  if (value <= level1) return "good";
  else if (value > level1 && value <= level3) return "moderate";
  else if (value > level3) return "bad";
};

const CardDetails = ({
  data,
  day,
  hour,
}: PropsWithChildren<CardDetailsProps>) => {
  return (
    <>
      <Stack padding="0.5em 1.5em">
        <Item src={wind} alt="wind" fontSize="0.9em">
          {day > 0
            ? (
                ((data?.forecast?.forecastday?.[day].day
                  ?.maxwind_kph as number) *
                  1000) /
                3600
              )
                .toFixed(0)
                .toString()
            : (((data?.current?.wind_kph as number) * 1000) / 3600)
                .toFixed(0)
                .toString()}{" "}
          m/s{" "}
          {day > 0
            ? data?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
            : data?.current?.wind_dir}
        </Item>
        <Item src={pressure} alt="pressure" fontSize="0.9em">
          {day > 0 &&
          data?.forecast?.forecastday?.[day].hour?.[hour].pressure_mb
            ? hPaTommHg(
                data?.forecast?.forecastday?.[day].hour?.[hour]
                  .pressure_mb as string
              )
                .toFixed(0)
                .toString()
            : hPaTommHg(data?.current?.pressure_mb as string)
                .toFixed(0)
                .toString()}{" "}
          mmHg
        </Item>
        <Item src={uv} alt="ultraviolet radiation" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.uv
            ? data?.forecast?.forecastday?.[day].day?.uv
            : data?.current?.uv}{" "}
        </Item>
        <Item
          src={pm25}
          alt="2.5 microns particles"
          iconSize="24"
          fontSize="0.9em"
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm2_5)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.pm2_5)
                .toFixed(0)
                .toString()}{" "}
          µg/m³
        </Item>
        <Item
          src={pm10}
          alt="10 microns particles"
          iconSize="24"
          fontSize="0.9em"
        >
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.pm10
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.pm10)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.pm10)
                .toFixed(0)
                .toString()}{" "}
          µg/m³
        </Item>
        <Item src={co} alt="carbon monoxide" iconSize="24" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.co
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.co)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.co).toFixed(0).toString()}{" "}
          µg/m³
        </Item>
        <Item src={o3} alt="ozone" iconSize="24" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.o3
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.o3)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.o3).toFixed(0).toString()}{" "}
          µg/m³
        </Item>
        <Item src={no2} alt="nitrogen dioxide" iconSize="24" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.no2
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.no2)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.no2)
                .toFixed(0)
                .toString()}{" "}
          µg/m³
        </Item>
        <Item src={so2} alt="sulphur dioxide" iconSize="24" fontSize="0.9em">
          {day > 0 && data?.forecast?.forecastday?.[day].day?.air_quality?.so2
            ? Number(data?.forecast?.forecastday?.[day].day?.air_quality?.so2)
                .toFixed(0)
                .toString()
            : Number(data?.current?.air_quality?.so2)
                .toFixed(0)
                .toString()}{" "}
          µg/m³
        </Item>
      </Stack>
    </>
  );
};

export default CardDetails;
