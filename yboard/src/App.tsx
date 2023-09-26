import {
  Button,
  CssBaseline,
  PaletteMode,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material";
import "./App.scss";
import WeatherPage from "./components/pages/WeatherPage";
import { getDesignTokens, theme } from "./styles/theme";
import { useMemo, useState } from "react";
import { lightTheme } from "./styles/light";
import { darkTheme } from "./styles/dark";
import { ColorContext } from "./types/ColorContext";
import SwitchModeButton from "./components/ui/buttons/SwitchModeButton";
import TestComponent from "./components/test/TestComponent";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // const theme = useMemo(
  //   () => createTheme(mode === "light" ? lightTheme : darkTheme),
  //   [mode]
  // );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="app">
        <ColorContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <SwitchModeButton />
            {/* <MyComponent color="primary">My Component</MyComponent> */}
            {/* <TestComponent /> */}
            {/* <MyCardComponent index={1} day={1} hour={12} /> */}
            <WeatherPage />
          </ThemeProvider>
        </ColorContext.Provider>
      </div>
    </StyledEngineProvider>
  );
}

export default App;
