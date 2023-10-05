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
import CardData from "./data/CardData";
import CardDetails from "./details/CardDetails";

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
    <StyledBox>
      <StyledCard variant="outlined">
        <StyledCardContent>
          <CardData data={weatherData} day={day} hour={hour} />
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
            <CardDetails data={weatherData} day={day} hour={hour} />
          </StyledCardContent>
        </Collapse>
      </StyledCard>
    </StyledBox>
  );
};

export default WeatherCard;
