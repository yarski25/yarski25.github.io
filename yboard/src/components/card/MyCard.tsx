import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";

type Image = {
  src: string;
  alt: string;
};

type Location = {
  name: string;
  region: string;
  country: string;
};

type Wind = {
  wind_kph: string;
  wind_ms: string;
  wind_degree: string;
  wind_dir: string;
};

const MyCard = () => {
  const [position, setPosition] = useState<Coords>({ lat: "", lon: "" });
  const [location, setLocation] = useState<Location>({
    name: "",
    region: "",
    country: "",
  });
  const [wind, setWind] = useState<Wind>({
    wind_kph: "",
    wind_ms: "",
    wind_degree: "",
    wind_dir: "",
  });
  const [temperature, setTemperature] = useState<string>("");
  const [image, setImage] = useState<Image>({ src: "", alt: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("useEffect called");
    WeatherService.getByCoords({ lat: position.lat, lon: position.lon })
      .then((response) => {
        setIsLoading(true);
        setTemperature(response.data.current.temp_c.toString());
        setImage({
          src: "https:" + response.data.current.condition.icon,
          alt: response.data.current.condition.text,
        });
        setLocation({
          name: response.data.location.name,
          region: response.data.location.region,
          country: response.data.location.country,
        });
        setWind({
          wind_kph: response.data.current.wind_kph.toFixed(0).toString(),
          wind_ms: ((response.data.current.wind_kph * 1000) / 3600)
            .toFixed(0)
            .toString(),
          wind_degree: response.data.current.wind_degree.toString(),
          wind_dir: response.data.current.wind_dir,
        });
      })
      .catch((e) => {
        setError((e as Error).message);
      })
      .finally(() => setIsLoading(false));
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
    <div>
      <Button onClick={handleOnClick} variant="contained" color="secondary">
        Get location
      </Button>
      <Box sx={{ maxWidth: 150 }}>
        <Card
          variant="outlined"
          sx={{ border: "2px solid purple", borderRadius: "16px" }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {location.country}
            </Typography>
            <Typography variant="h5" component="div">
              {location.name}
            </Typography>
            <CardMedia
              component="img"
              height="100"
              image={image.src}
              alt={image.alt}
            />
            {!isLoading ? (
              <Typography variant="h5" component="div">
                {temperature}℃
              </Typography>
            ) : (
              <CircularProgress color="secondary" />
            )}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {wind.wind_kph} km/h {wind.wind_dir}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {wind.wind_ms} m/s
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default MyCard;
