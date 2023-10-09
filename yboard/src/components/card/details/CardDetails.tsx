import { PropsWithChildren } from "react";
import wind from "../../../assets/wind.webp";
import aqi from "../../../assets/air-quality.webp";
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

const CardDetails = ({
  data,
  day,
  hour,
}: PropsWithChildren<CardDetailsProps>) => {
  return (
    <>
      <Stack padding="0.5em 1.5em">
        <Item src={wind} alt="wind">
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
        <Item src={aqi} alt="air quality">
          {day > 0 &&
          data?.forecast?.forecastday?.[day].day?.air_quality?.["us-epa-index"]
            ? data?.forecast?.forecastday?.[day].day?.air_quality?.[
                "us-epa-index"
              ]
            : data?.current?.air_quality?.["us-epa-index"]}
        </Item>
      </Stack>
    </>
  );
};

export default CardDetails;
