import { PropsWithChildren } from "react";
import humidity from "../../../assets/humidity.webp";
import wind from "../../../assets/wind.webp";
import aqi from "../../../assets/air-quality.webp";
import moonPhase from "../../../assets/moon-phase.webp";
import moon1 from "../../../assets/moon1.webp";
import moon2 from "../../../assets/moon2.webp";
import moon3 from "../../../assets/moon3.webp";
import moon4 from "../../../assets/moon4.webp";
import temp from "../../../assets/temp.webp";
import Item from "../../ui/Item/Item";
import { Weather } from "../../../types/Forecast";
import { DeepPartial } from "../../../types/custom/DeepPartial";
import { CardMedia, Stack, Typography } from "@mui/material";

type CardDataProps = {
  day: number;
  hour: number;
  data?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const dateTransforme = (yyyymmdd: string) => {
  const date = new Date(yyyymmdd);
  const day = date.getDate().toString();
  const month = date.toLocaleString("default", { month: "long" });
  return `${day} ${month}`;
};

const convertMoonPhase = (moonPhase: string) => {
  let moonIcon = "moon";
  switch (moonPhase) {
    case "New Moon": {
      moonIcon += "1";
      return moon1;
    }
    case "Waxing Crescent":
    case "First Quarter":
    case "Waxing Gibbous": {
      moonIcon += "2";
      return moon2;
    }
    case "Full Moon": {
      moonIcon += "3";
      return moon3;
    }
    case "Waning Gibbous":
    case "Last Quarter":
    case "Waning Crescent": {
      moonIcon += "4";
      return moon4;
    }
    default: {
      moonIcon += "1";
      return moon1;
    }
  }
};

const CardData = ({ data, day, hour }: PropsWithChildren<CardDataProps>) => {
  return (
    <Stack direction="column" justifyContent="center">
      <Typography color="black" paddingTop="0.5em">
        {dateTransforme(data?.forecast?.forecastday?.[day].date as string)}
      </Typography>
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
          <Item
            src={convertMoonPhase(
              data?.forecast?.forecastday?.[day].astro?.moon_phase as string
            )}
            alt="moon phase"
          >
            {day > 0 &&
            data?.forecast?.forecastday?.[day].astro?.moon_illumination
              ? data?.forecast?.forecastday?.[day].astro?.moon_illumination
              : data?.forecast?.forecastday?.[day].astro?.moon_illumination}
            %
          </Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardData;
