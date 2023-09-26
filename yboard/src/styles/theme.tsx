import {
  createTheme,
  styled,
  Theme,
  useThemeProps,
} from "@mui/material/styles";
import { blue, deepOrange, grey, purple } from "@mui/material/colors";
import { StyledComponent } from "@emotion/styled";
import { OverridesStyleRules } from "@mui/material/styles/overrides";
import TestComponent from "../components/test/TestComponent";
import { forwardRef } from "react";
import { PaletteMode } from "@mui/material";

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

// interface MyCardComponentProps {
//   color?: string;
// }
// type MyCardComponentClassKey = "root" | "bottom";

// declare module "@mui/material/styles" {
//   interface Components {
//     MyCardComponent?: {
//       defaultProps?: MyCardComponentProps;
//       styleOverrides?: Partial<
//         OverridesStyleRules<MyCardComponentClassKey, "MyCardComponent", Theme>
//       >;
//     };
//   }
//   // // allow configuration using `createTheme`
//   // interface ThemeOptions {
//   //   status?: {
//   //     danger?: string;
//   //   };
//   // }
// }

// interface MyComponentProps {
//   color?: "primary" | "secondary" | "inherit";
//   variant?: "normal" | "dashed";
// }
// type MyComponentClassKey = "root";

// export const MyComponent = styled("div", {
//   // Configure which props should be forwarded on DOM
//   shouldForwardProp: (prop) =>
//     prop !== "color" && prop !== "variant" && prop !== "sx",
//   name: "MyComponent",
//   slot: "Root",
//   // We are specifying here how the styleOverrides are being applied based on props
//   overridesResolver: (props, styles) => [
//     styles.root,
//     props.color === "primary" && styles.primary,
//     props.color === "secondary" && styles.secondary,
//   ],
// })<MyComponentProps>(({ theme }) => ({
//   color: theme.palette.primary.main,
//   backgroundColor: theme.palette.background.paper,
//   padding: theme.spacing(1),
//   border: "1px dashed black",
// }));
//   overridesResolver: (props, styles) => styles.root,
// })(({ theme }) => {
//   return {
//     padding: 8,
//   };
// });

// const StyledComp = styled("div", {
//   shouldForwardProp: (prop) => prop !== "color" && prop !== "myProp",
// })<{ myProp?: boolean; color?: string }>(({ theme, myProp, color }) => ({
//   backgroundColor: myProp ? "aliceblue" : "red",
//   color,
//   padding: theme.spacing(1),
// }));

// necessary to include custom components
// declare module "@mui/material/styles" {
//   interface Components {
//     MyComponent?: {
//       defaultProps?: MyComponentProps;
//       styleOverrides?: Partial<
//         OverridesStyleRules<MyComponentClassKey, "MyComponent", Theme>
//       >;
//     };
//   }
// }

type CustomComponentProps = {
  color?: "primary" | "secondary";
  backgroundColor?: string;
  //variant?: "outlined";
};

type CustomComponentClassKey = "root";

declare module "@mui/material/styles" {
  interface Components {
    StyledBox?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledBox", Theme>
      >;
    };
    StyledCard?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCard", Theme>
      >;
    };
    StyledCardContent?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardContent", Theme>
      >;
    };
    StyledCardMedia?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardMedia", Theme>
      >;
    };
    StyledCardActions?: {
      defaultProps?: CustomComponentProps;
      styleOverrides?: Partial<
        OverridesStyleRules<CustomComponentClassKey, "StyledCardActions", Theme>
      >;
    };
  }
}

// theme construction
export const theme = createTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: purple[50],
      main: purple[500],
      dark: purple[700],
    },
    background: {
      //paper: "#fff",
      paper: blue[200],
      default: blue[200],
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
    // MyCard: {},
    // MyCardComponent: {
    //   defaultProps: {
    //     color: "primary",
    //   },
    // },
    // MyComponent: {
    //   // defaultProps: {
    //   //   color: "inherit",
    //   // },
    //   styleOverrides: {
    //     // root: (props) => ({
    //     //   ...(props.color !== "primary" && { borderRadius: "16px" }),
    //     // }),
    //     // color: "red",
    //     //borderRadius: "16px",
    //     // padding: 16,
    //   },
    // },
    // StyledCard: {
    //   defaultProps: {
    //     variant: "outlined",
    //   },
    // },
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

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: purple[200],
          },
          divider: purple[200],
          background: {
            default: purple[50],
            paper: purple[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
});
