import { PropsWithChildren } from "react";
import humidity from "../../../assets/humidity.webp";
import wind from "../../../assets/wind.webp";
import aqi from "../../../assets/air-quality.webp";
import temp from "../../../assets/temp.webp";
import Item from "../../ui/Item/Item";
import { Weather } from "../../../types/Forecast";
import { DeepPartial } from "../../../types/custom/DeepPartial";
import { CardMedia, Stack } from "@mui/material";

type CardDataProps = {
  day: number;
  hour: number;
  data?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const CardData = ({ data, day, hour }: PropsWithChildren<CardDataProps>) => {
  return (
    <Stack direction="column" justifyContent="center">
      <CardMedia
        component="img"
        width="100"
        image={
          day > 0
            ? data?.forecast?.forecastday?.[day].day?.condition?.icon
            : data?.current?.condition?.icon
        }
        alt={
          day > 0
            ? data?.forecast?.forecastday?.[day].day?.condition?.text
            : data?.current?.condition?.text
        }
      />
      <Stack spacing={0.25} direction="column" justifyContent="center">
        <Stack>
          <Item
            src={temp}
            alt="temperature"
            iconSize="32"
            fontSize="2em"
            justifyContentItem="center"
            paddingItem="0.5em 0em"
          >
            {day > 0
              ? Number(data?.forecast?.forecastday?.[day].day?.maxtemp_c)
                  .toFixed(0)
                  .toString()
              : Number(data?.current?.temp_c).toFixed(0).toString()}
            ℃
          </Item>
        </Stack>
        <Stack padding="0em 1.5em">
          <Item src={wind} alt="wind">
            {day > 0
              ? Number(data?.forecast?.forecastday?.[day].day?.maxwind_kph)
                  .toFixed(0)
                  .toString()
              : Number(data?.current?.wind_kph).toFixed(0).toString()}{" "}
            km/h{" "}
            {day > 0
              ? data?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
              : data?.current?.wind_dir}
          </Item>
          <Item src={humidity} alt="humidity">
            {day > 0
              ? data?.forecast?.forecastday?.[day].day?.avghumidity
              : data?.current?.humidity}
            {""}%
          </Item>
          <Item src={aqi} alt="air quality">
            {day > 0 &&
            data?.forecast?.forecastday?.[day].day?.air_quality?.[
              "us-epa-index"
            ]
              ? data?.forecast?.forecastday?.[day].day?.air_quality?.[
                  "us-epa-index"
                ]
              : data?.current?.air_quality?.["us-epa-index"]}
          </Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardData;
