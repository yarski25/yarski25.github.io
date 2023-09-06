import { SxProps } from "@mui/material";

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
  boxShadow: 10,
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
  padding: "0.5em",
};
