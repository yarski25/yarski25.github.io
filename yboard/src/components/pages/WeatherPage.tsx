import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Button from "@mui/material/Button";
import { CircularProgress, Stack, TextField, makeStyles } from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";
import { Current } from "../../types/Current";
import { DeepPartial } from "../../types/custom/DeepPartial";
import MyCard from "../card/MyCard";
import { Forecast, ForecastDay, Hour, Weather } from "../../types/Forecast";
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";
import { TransitionProps } from "react-transition-group/Transition";

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

  // const [onOff, setOnOff] = useState(true)
  // const [isPending, startTransition] = useTransition() // (state, timeout)

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

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles: { [id: string]: React.CSSProperties } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const inProp = false;
  const nodeRef = useRef(null);

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
            <MyCard key={index} day={index} hour={12} weatherData={weather} />
          ))}
        {/* <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
          {(state) => (
            <div
              ref={nodeRef}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              I'm a fade Transition!
            </div>
          )}
        </Transition> */}
        {/* <TransitionGroup
          in={inProp}
          timeout={200}
          classNames="my-node"
          unmountOnExit={true}
        >
          {weather?.current?.temp_c && weather?.forecast?.forecastday?.map((id: number , forecast ) => (
            <CSSTransition in={loaded} key={id} timeout={500} classNames="item">
              <MyCard key={id} day={id} hour={12} weatherData={weather} />
            </CSSTransition>
          ))}
        </TransitionGroup> */}
      </div>
    </div>
  );
};

export default WeatherPage;
