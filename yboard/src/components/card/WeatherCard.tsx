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
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: "1.2em", color: "black" }}
          >
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].day?.maxtemp_c
              : weatherData?.current?.temp_c}
            ℃
          </Typography>
          <Typography
            sx={{ mb: 1.5, fontSize: "0.5em" }}
            color="text.secondary"
          >
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].day?.maxwind_kph
              : weatherData?.current?.wind_kph}{" "}
            km/h{" "}
            {day > 0
              ? weatherData?.forecast?.forecastday?.[day].hour?.[hour].wind_dir
              : weatherData?.current?.wind_dir}
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
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </StyledBox>
  );
};

export default WeatherCard;
