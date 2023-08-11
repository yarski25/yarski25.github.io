import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
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
