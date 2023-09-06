import { createTheme } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

// colors
// most expensive

// YInMn Blue
// #2E5090
// Lapis Lazuli
// #26619C
// Tyrian Purple
// #66023C

// combinations
// Mauve, sapphire and powder blue
// #d9a5b3, #1868ae, #c6d7eb

// Raspberry and shades of blue
// #8a307f, #79a7d3, #6883bc

// Sea-foam, salmon and navy
// #aed6dc, #ff9a8d, #4a536b

export const theme = createTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: purple[200],
      main: purple[500],
      dark: purple[700],
    },
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
  },
  components: {
    // Name of the component
    MuiTextField: {
      defaultProps: {
        sx: {
          backgroundColor: "secondary",
          //border: "3px solid #001d3d",
        },
        InputLabelProps: {
          sx: {
            color: "#003566",
            textTransform: "capitalize",
          },
        },
        InputProps: {
          sx: {
            "&:hover fieldset": {
              border: "2px solid blue!important",
              borderRadius: 0,
            },
            "&:focus-within fieldset, &:focus-visible fieldset": {
              border: "4px solid red!important",
            },
          },
        },
        inputProps: {
          sx: {
            color: "black",
            paddingLeft: "1em",
            fontSize: "1.2em",
          },
        },
        FormHelperTextProps: {
          sx: {
            color: "red",
          },
        },
      },
    },
  },
});
