import { Box, Card, SxProps, styled } from "@mui/material";
import MyCard from "../components/card/MyOriginCard";

// Default breakpoints
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export const BoxProps: SxProps = {
  minWidth: "1dvw",
  margin: "2dvw",
  marginTop: "2rem",
  width: "100%",
  boxShadow: "10",
  borderRadius: "1em",
};

export const CardProps: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid purple",
  borderRadius: "1em",
  backgroundColor: "#af52bfa1",
  boxSizing: "box-border",
};

export const CardContentProps: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "0.0em",
};

type StyledBoxClassKey = "root";

type StyledBoxProps = {
  color?: "primary" | "secondary";
};

type StyledCardProps = {
  color?: "primary" | "secondary";
  //backgroundColor?: string;
  variant?: "outlined";
};

type StyledCardContentProps = {
  color?: "primary" | "secondary";
};

export const StyledBox = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "color" && prop !== "sx",
  name: "StyledBox",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})<StyledBoxProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  //padding: theme.spacing(1),
  minWidth: "1dwv",
  margin: "1dvw",
  marginTop: "2dvw",
  width: "100%",
  borderRadius: "1em",
  boxShadow: theme.shadows[10],
}));

export const StyledCard = styled(Card, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "color" && prop !== "sx",
  name: "StyledCard",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})<StyledCardProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  //padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid blue",
  borderRadius: "1em",
  //backgroundColor: "#af52bfa1",
  boxSizing: "border-box",
}));

export const StyledCardContent = styled(Card, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) => prop !== "color" && prop !== "sx",
  name: "StyledCardContent",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})<StyledCardContentProps>(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "none",
}));
