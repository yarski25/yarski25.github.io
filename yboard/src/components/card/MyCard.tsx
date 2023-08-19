import { PropsWithChildren } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Weather } from "../../types/Forecast";

type MyCardProps = {
  day: number;
  hour: number;
  weatherData?: DeepPartial<Weather>;
  style?: React.CSSProperties;
};

const MyCard = ({ weatherData, day, hour }: PropsWithChildren<MyCardProps>) => {
  return (
    <div className="weather-page__output__card">
      <Box
        sx={{
          //maxWidth: "15dvw",
          minWidth: "1dvw",
          margin: "auto",
          marginTop: "2rem",
          boxShadow: 10,
          borderRadius: "1em",
          // position: "static",
          // display: "flex",
          //justifyContent: "center",
          //alignItems: "center",
          // minHeight: "100vh",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            border: "2px solid purple",
            borderRadius: "1em",
            backgroundColor: "#af52bfa1",
            boxSizing: "box-border",
          }}
        >
          <CardContent sx={{ padding: "0.5em" }}>
            <Typography
              sx={{ fontSize: 8 }}
              color="text.secondary"
              gutterBottom
            >
              {weatherData?.location?.country}
            </Typography>
            <Typography variant="h5" component="div" sx={{ fontSize: "0.5em" }}>
              {weatherData?.location?.name}
            </Typography>
            <CardMedia
              component="img"
              width="100"
              //height="100"

              image={
                day > 0
                  ? weatherData?.forecast?.forecastday?.[day].day?.condition
                      ?.icon
                  : weatherData?.current?.condition?.icon
              }
              alt={
                day > 0
                  ? weatherData?.forecast?.forecastday?.[day].day?.condition
                      ?.text
                  : weatherData?.current?.condition?.text
              }
              //sx={{ objectFit: "contain" }}
            />
            <Typography variant="h5" component="div" sx={{ fontSize: "1em" }}>
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
                ? weatherData?.forecast?.forecastday?.[day].hour?.[hour]
                    .wind_dir
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
              {/* {weatherData?.wind_ms} m/s */}
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
          </CardContent>
          <CardActions>
            {/* <Button size="small" sx={{ fontSize: 10 }}>
              Learn More
            </Button> */}
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default MyCard;
