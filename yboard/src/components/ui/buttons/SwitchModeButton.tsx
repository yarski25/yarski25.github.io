import {
  Brightness4 as LightIcon,
  Brightness7 as DarkIcon,
} from "@mui/icons-material";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorContext } from "../../../types/ColorContext";

const SwitchModeButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorContext);

  return (
    <Box
      sx={{
        display: "flex",
        //minHeight: "100vh",
        //width: "100%",
        alignItems: "right",
        justifyContent: "right",
      }}
    >
      {/* {theme.palette.mode} mode */}
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Box>
  );
};

export default SwitchModeButton;
