import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Coords } from "../../types/Coords";
import WeatherService from "../../api/WeatherService";
import { useFetching } from "../../hooks/useFetching";

const MyCard = () => {
  const [location, setLocation] = useState<Coords>({ lat: "", lon: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  let temperature = "";

  useEffect(
    () => console.log("re-render because location changed:", temperature),
    [temperature]
  );

  function handleOnClick() {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          setLocation({
            lat: latitude,
            lon: longitude,
          });
          //console.log("Latitude is :", location.lat);
          //console.log("Longitude is :", location.lon);
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          WeatherService.getByCoords({ lat: latitude, lon: longitude })
            .then((response) => {
              setIsLoading(true);
              temperature = response.data.current.temp_c.toString();
              console.log(temperature);
            })
            .catch((e) => {
              setError((e as Error).message);
            })
            .finally(() => setIsLoading(false));
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Not Available");
    }
  }

  return (
    <div>
      <Button onClick={handleOnClick} variant="contained" color="secondary">
        Get location
      </Button>
      <Box sx={{ minWidth: 275 }}>
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
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              {temperature}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
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
