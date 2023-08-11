import { PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { DeepPartial } from "../../types/custom/DeepPartial";
import { Current } from "../../types/Current";

type MyCardProps = {
  weatherData?: DeepPartial<Current>;
  style?: React.CSSProperties;
};

const MyCard = ({ weatherData }: PropsWithChildren<MyCardProps>) => {
  return (
    <div>
      <Box
        sx={{
          //maxWidth: "20rem",
          minWidth: "10dvw",
          margin: "auto",
          marginTop: "2rem",
          boxShadow: 10,
          borderRadius: "16px",
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
            borderRadius: "16px",
            backgroundColor: "#af52bfa1",
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {weatherData?.location?.country}
            </Typography>
            <Typography variant="h5" component="div">
              {weatherData?.location?.name}
            </Typography>
            <CardMedia
              component="img"
              height="100"
              image={weatherData?.current?.condition?.icon}
              alt={weatherData?.current?.condition?.text}
            />
            <Typography variant="h5" component="div">
              {weatherData?.current?.temp_c}℃
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {weatherData?.current?.wind_kph} km/h{" "}
              {weatherData?.current?.wind_dir}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {weatherData?.wind_ms} m/s
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              air quality: {weatherData?.current?.air_quality?.["us-epa-index"]}
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
