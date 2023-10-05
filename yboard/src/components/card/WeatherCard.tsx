import { PropsWithChildren, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  IconButtonProps,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Weather } from "../../types/Forecast";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BoxProps,
  CardContentProps,
  CardProps,
  MyCardProps,
  StyledBox,
  StyledCard,
  StyledCardContent,
} from "../../styles/card";
import { ExpandMore } from "../ui/buttons/ExpandMore";
import humidity from "../../assets/humidity.webp";
import wind from "../../assets/wind.webp";
import aqi from "../../assets/air-quality.webp";
import temp from "../../assets/temp.webp";
import Item from "../ui/Item/Item";

type WeatherCardProps = {
  index: number;
  day: number;
  hour: number;
  weatherData?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

type variant = "small" | "normal";

const WeatherCard = ({
  weatherData,
  day,
  hour,
  index,
}: PropsWithChildren<WeatherCardProps>) => {
  const [expandedId, setExpandedId] = useState(-1);

  const handleExpandClick = (id: number) => {
    setExpandedId(expandedId === id ? -1 : id);
    //setExpanded(!expanded ? expanded : expanded);
  };

  return (
    //<div className="weather-page__output__card">
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledCardContent>
          <CardMedia
            component="img"
            width="100"
            //height="100"

            image={
              day > 0
                ? weatherData?.forecast?.forecastday?.[day].day?.condition?.icon
                : weatherData?.current?.condition?.icon
            }
            alt={
              day > 0
                ? weatherData?.forecast?.forecastday?.[day].day?.condition?.text
                : weatherData?.current?.condition?.text
            }
          />
          {/* <Typography
            variant="h5"
            component="div"
            sx={{ mb: 1.5, fontSize: "1.5em" }}
            color="text.secondary"
          >
            {day > 0
              ? Number(weatherData?.forecast?.forecastday?.[day].day?.maxtemp_c)
                  .toFixed(0)
                  .toString()
              : Number(weatherData?.current?.temp_c).toFixed(0).toString()}
            ℃
          </Typography> */}

          <Item src={temp} alt="temperature">
            {day > 0
              ? Number(weatherData?.forecast?.forecastday?.[day].day?.maxtemp_c)
                  .toFixed(0)
                  .toString()
              : Number(weatherData?.current?.temp_c).toFixed(0).toString()}
            ℃
          </Item>
          {/* <Typography
            sx={{ mb: 1.5, fontSize: "0.5em" }}
            color="text.secondary"
          >
            {day > 0
              ? Number(
                  weatherData?.forecast?.forecastday?.[day].day?.maxwind_kph
                )
                  .toFixed(0)
                  .toString()
              : Number(weatherData?.current?.wind_kph)
                  .toFixed(0)
                  .toString()}{" "}
            km/h{" "}
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
              : weatherData?.current?.wind_dir}
          </Typography> */}
          <Item src={wind} alt="wind">
            {day > 0
              ? Number(
                  weatherData?.forecast?.forecastday?.[day].day?.maxwind_kph
                )
                  .toFixed(0)
                  .toString()
              : Number(weatherData?.current?.wind_kph)
                  .toFixed(0)
                  .toString()}{" "}
            km/h{" "}
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
              : weatherData?.current?.wind_dir}
          </Item>
          {/* <div className="weather-card-item">
            <div className="weather-card-item__icon">
              <img src={humidity} width={24} height={24} alt="humidity" />
            </div>
            <div className="weather-card-item__text">
              <Typography
                sx={{
                  mb: 1.5,
                  fontSize: "1em",
                  textAlign: "center",
                  alignItems: "center",
                }}
                color="text.secondary"
              >
                {" "}
                {day > 0
                  ? weatherData?.forecast?.forecastday?.[day].day?.avghumidity
                  : weatherData?.current?.humidity}{" "}
                %
              </Typography>
            </div>
          </div> */}
          {/* <Stack
            spacing={0.25}
            direction="row"
            justifyContent="center"
            alignItems="center"
            // sx={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
          >
            <img
              src={humidity}
              width={16}
              height={16}
              alt="humidity"
              style={{ marginRight: "0.5em" }}
            />
            <Typography
              sx={{
                mb: 0,
                fontSize: "1em",
                textAlign: "center",
                alignItems: "center",
              }}
              color="text.secondary"
            >
              {" "}
              {day > 0
                ? weatherData?.forecast?.forecastday?.[day].day?.avghumidity
                : weatherData?.current?.humidity}{" "}
              %
            </Typography>
          </Stack> */}

          <Item src={humidity} alt="humidity">
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].day?.avghumidity
              : weatherData?.current?.humidity}{" "}
            %
          </Item>

          <Item src={aqi} alt="air quality">
            {day > 0 &&
            weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
              "us-epa-index"
            ]
              ? weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
                  "us-epa-index"
                ]
              : weatherData?.current?.air_quality?.["us-epa-index"]}
          </Item>

          {/* <Typography
            sx={{ mb: 1.5, fontSize: "0.5em" }}
            color="text.secondary"
          >
            air quality:
            {day > 0 &&
            weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
              "us-epa-index"
            ]
              ? weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
                  "us-epa-index"
                ]
              : weatherData?.current?.air_quality?.["us-epa-index"]}
          </Typography> */}
        </StyledCardContent>
        <CardActions>
          <ExpandMore
            expand={expandedId === index}
            onClick={() => handleExpandClick(index)}
            aria-expanded={expandedId === index}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
          <StyledCardContent>
            <Typography
              sx={{ mb: 1.5, fontSize: "0.5em" }}
              color="text.secondary"
            >
              air quality:
              {day > 0 &&
              weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
                "us-epa-index"
              ]
                ? weatherData?.forecast?.forecastday?.[day].day?.air_quality?.[
                    "us-epa-index"
                  ]
                : weatherData?.current?.air_quality?.["us-epa-index"]}
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: "0.5em" }}
              color="text.secondary"
            >
              {day > 0
                ? (
                    ((weatherData?.forecast?.forecastday?.[day].day
                      ?.maxwind_kph as number) *
                      1000) /
                    3600
                  )
                    .toFixed(0)
                    .toString()
                : (((weatherData?.current?.wind_kph as number) * 1000) / 3600)
                    .toFixed(0)
                    .toString()}{" "}
              m/s
            </Typography>
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </StyledBox>
  );
};

export default WeatherCard;
