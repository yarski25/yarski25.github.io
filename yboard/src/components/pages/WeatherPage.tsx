import React, {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import Button from "@mui/material/Button";
import {
  CircularProgress,
  Stack,
  TextField,
  Typography,
  makeStyles,
} from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";
import { Current } from "../../types/Current";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Forecast, ForecastDay, Hour, Weather } from "../../types/Forecast";
import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";
import WeatherCard from "../card/WeatherCard";

const WeatherPage = () => {
  const [position, setPosition] = useState<Coords>({ lat: "", lon: "" });
  const [city, setCity] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const coordsCondition = position.lat && position.lon;
  const cityCondition = city !== "";

  const [weather, setWeather] = useState<DeepPartial<Weather>>();

  const [forecastWeather, setForecastWeather] =
    useState<DeepPartial<ForecastDay[]>>();

  //let forecastWeather: DeepPartial<Forecast> = {};
  //const cityTyped: boolean = false;
  //const locationChanged: boolean = false;

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

  const [error, setError] = useState<string>("");

  // const [onOff, setOnOff] = useState(true)
  // const [isPending, startTransition] = useTransition() // (state, timeout)

  const [fetchData, isDataLoading, dataError] = useFetching(async () => {
    const coordsCondition = position.lat && position.lon;
    const cityCondition = city !== "";

    if (!cityCondition) {
      if (coordsCondition) {
        const response = await WeatherService.getForecast(
          {
            lat: position.lat,
            lon: position.lon,
          },
          "3"
        );

        setWeather(response.data);
      }
    } else {
      // if (position.lat && position.lon) {
      const response = await WeatherService.getForecastByCity(city, "3");

      setWeather(response.data);
      // }
    }

    //A -> get current location
    //B -> type city name
    //after button click
    // if city is empty && coords empty => nothing
    // if city is empty && coords full => fetch by coords
    // if city is full && coords empty => fetch by city
    // if city is full && coords full => fetch by last action

    // add flag to detect user action

    //const response = await WeatherService.getForecastByCity(city, "3");

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
    // if (position.lat && position.lon) {
    //   fetchData();
    // }
    // const timeoOutId = setTimeout(()=>fetchData(), 500);
    const timeOutId = setTimeout(() => fetchData(), 1000);
    setIsTyping(false);
    // if (coordsCondition || cityCondition)
    return () => {
      clearTimeout(timeOutId);
    };
  }, [position, isTyping]);

  const handleCity = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    const letters = /^[A-Za-z]+$/;
    if (
      event.target.value.length > 0 &&
      event.target.value.match(letters) === null
    ) {
      console.log("Wrong input! Only letters are allowed...");
      return;
    }
    setCity(event.target.value);
    //console.log(city);
  };

  const handleOnClick = () => {
    // if (city !== "") {
    // }
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
      // } else if (city) {
      //   setCity("");
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
  const test: DeepPartial<Weather> = {};
  const testArray = [1, 2, 3, 4, 5];

  return (
    <div className="weather-page">
      <div className="weather-page__input">
        <TextField
          id="outlined-basic"
          label="city"
          variant="outlined"
          color="secondary"
          value={city}
          onChange={handleCity}
          // onChange={(e: ChangeEvent<HTMLInputElement>) => {
          //   setCity(e.target.value);
          //   console.log(city);
          // }}
        />
        <Button onClick={handleOnClick} variant="contained" color="secondary">
          Get location
        </Button>
      </div>
      <div className="weather-page__output">
        {isDataLoading && (
          <Stack
            margin="auto"
            minHeight="80dvh"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ color: "secondary" }} />
          </Stack>
        )}
        {weather?.current?.temp_c && (
          <div className="weather-page__output__location">
            <Typography
              variant="h2"
              sx={{ fontSize: "0.8em" }}
              color="text.secondary"
              gutterBottom
              marginTop="0.5em"
            >
              {weather?.location?.country}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              color="text.primary"
              sx={{ fontSize: "0.8em" }}
              gutterBottom
            >
              {weather?.location?.region} - {weather?.location?.name}
            </Typography>
            <Typography variant="h2" component="div" sx={{ fontSize: "0.5em" }}>
              GPS: {weather?.location?.lat}, {weather?.location?.lon}
            </Typography>
          </div>
        )}

        {weather?.current?.temp_c && (
          <div className="weather-page__output__cards">
            {weather?.forecast?.forecastday?.map((forecast, index: number) => (
              // <MyCard
              //   index={index}
              //   key={index}
              //   day={index}
              //   hour={12}
              //   weatherData={weather}
              // />
              <WeatherCard
                index={index}
                key={index}
                day={index}
                hour={12}
                weatherData={weather}
              />
            ))}
          </div>
        )}
        {/* <div className="test">
          <div className="test__item">1 </div>
          <div className="test__item">2 </div>
          <div className="test__item">3 </div>
          <div className="test__item">4 </div>
          <div className="test__item">5 </div>
          <div className="test__item">6 </div>
          <div className="test__item">7 </div>
          <div className="test__item">8 </div>
          <div className="test__item">9 </div>
        </div> */}

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
        {/* 
        <TransitionGroup>
          {weather?.current?.temp_c &&
            weather?.forecast?.forecastday?.map((_forecast, id: number) => (
              <CSSTransition key={id} timeout={5000} classNames="my-node">
                <MyCard key={id} day={id} hour={12} weatherData={weather} />
              </CSSTransition>
            ))}
        </TransitionGroup> */}
      </div>
    </div>
  );
};

export default WeatherPage;
