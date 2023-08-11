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
              image={weatherData?.current?.condition?.icon}
              alt={weatherData?.current?.condition?.text}
              //sx={{ objectFit: "contain" }}
            />
            <Typography variant="h5" component="div" sx={{ fontSize: "1em" }}>
              {weatherData?.current?.temp_c}℃
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: "0.5em" }}
              color="text.secondary"
            >
              {weatherData?.current?.wind_kph} km/h{" "}
              {weatherData?.current?.wind_dir}
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: "0.5em" }}
              color="text.secondary"
            >
              {weatherData?.wind_ms} m/s
            </Typography>
            <Typography
              sx={{ mb: 1.5, fontSize: "0.5em" }}
              color="text.secondary"
            >
              air quality: {weatherData?.current?.air_quality?.["us-epa-index"]}
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
