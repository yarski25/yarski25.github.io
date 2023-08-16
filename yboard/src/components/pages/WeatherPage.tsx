import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgress, Stack, TextField, makeStyles } from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";
import { Current } from "../../types/Current";
import { DeepPartial } from "../../types/custom/DeepPartial";
import MyCard from "../card/MyCard";
import { Forecast, ForecastDay, Hour, Weather } from "../../types/Forecast";

const WeatherPage = () => {
  const [position, setPosition] = useState<Coords>({ lat: "", lon: "" });

  const [weather, setWeather] = useState<DeepPartial<Weather>>();

  const [forecastWeather, setForecastWeather] =
    useState<DeepPartial<ForecastDay[]>>();

  //let forecastWeather: DeepPartial<Forecast> = {};

  const [currentWeather, setCurrentWeather] = useState<DeepPartial<Current>>({
    location: {
      name: "",
      region: "",
      country: "",
    },
    temp_c: "",
    current: {
      condition: { text: "", icon: "" },
      wind_kph: "",
      wind_degree: "",
      wind_dir: "",
      air_quality: { "us-epa-index": "" },
    },
    wind_ms: "",
  } as DeepPartial<Current>);

  const [weatherRequest, setWeatherRequest] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [fetchData, isDataLoading, dataError] = useFetching(async () => {
    const response = await WeatherService.getForecast(
      {
        lat: position.lat,
        lon: position.lon,
      },
      "7"
    );

    setWeather(response.data);
    //setForecastWeather(response.data?.forecastday);

    // response.data.forecastday.map(
    //   (forecastday: ForecastDay) => forecastday.hour
    // );

    // forecastWeather = response.data;

    // const response = await WeatherService.getByCoords({
    //   lat: position.lat,
    //   lon: position.lon,
    // });

    // setCurrentWeather((initWeather) => ({
    //   ...initWeather,
    //   location: {
    //     ...initWeather.location,
    //     name: response.data.location.name,
    //     region: response.data.location.region,
    //     country: response.data.location.country,
    //   },
    //   current: {
    //     ...initWeather.current,
    //     temp_c: response.data.current.temp_c.toString(),
    //     wind_kph: (response.data.current.wind_kph as number)
    //       .toFixed(0)
    //       .toString(),
    //     wind_degree: response.data.current.wind_degree.toString(),
    //     wind_dir: response.data.current.wind_dir,
    //     condition: {
    //       ...initWeather.current?.condition,
    //       icon: "https:" + response.data.current.condition.icon,
    //       text: response.data.current.condition.text,
    //     },
    //     air_quality: {
    //       ...initWeather.current?.air_quality,
    //       "us-epa-index": response.data.current.air_quality["us-epa-index"],
    //     },
    //   },
    //   wind_ms: (((response.data.current.wind_kph as number) * 1000) / 3600)
    //     .toFixed(0)
    //     .toString(),
    // }));
  });

  // const [fetchTestData, isTestDataLoading, testDataError] = useFetching(
  //   async (city: string) => {
  //     const testResponse = await WeatherService.getByCityName("Prague");
  //   }
  // );

  useEffect(() => {
    if (position.lat && position.lon) {
      fetchData();
      setWeatherRequest(true);
    }
  }, [position]);

  const handleOnClick = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude.toFixed(6).toString(),
            lon: position.coords.longitude.toFixed(6).toString(),
          });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Not Available");
    }
  };

  return (
    <div className="weather-page">
      <div className="weather-page__input">
        <TextField
          id="outlined-basic"
          label="city"
          variant="outlined"
          color="secondary"
          //helperText="Please enter a valid input"
          // //size="small"
          // sx={{ width: "300px", height: "200px" }}
        />
        {/* <Input id="outline-basic" label="City" variant="outlined" /> */}
        <Button onClick={handleOnClick} variant="contained" color="secondary">
          Get location
        </Button>
      </div>
      <div className="weather-page__output">
        {isDataLoading && (
          <Stack
            margin="auto"
            minHeight="80dvh"
            //direction="column"
            justifyContent="center"
            alignItems="center"
            // spacing={5}
          >
            <CircularProgress sx={{ color: "secondary" }} />
          </Stack>
        )}
        {weather?.current?.temp_c &&
          weather?.forecast?.forecastday?.map((forecast, index: number) => (
            <div>
              <MyCard key={index} day={index} hour={12} weatherData={weather} />
            </div>
          ))}
        {/* {weather?.forecast?.forecastday?.[0].hour?.[0].temp_c &&
          weather.forecast.forecastday[0].hour[0].temp_c} */}
        {/* {weather?.current?.temp_c && <MyCard weatherData={weather} />} */}
      </div>
    </div>
  );
};

export default WeatherPage;
