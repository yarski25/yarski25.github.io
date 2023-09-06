import {
  Button,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import "./App.scss";
import WeatherPage from "./components/pages/WeatherPage";
import { theme } from "./styles/theme";
import { useMemo, useState } from "react";
import { lightTheme } from "./styles/light";
import { darkTheme } from "./styles/dark";
import { ColorContext } from "./types/ColorContext";
import SwitchModeButton from "./components/ui/buttons/SwitchModeButton";

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

  const theme = useMemo(
    () => createTheme(mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <div className="app">
      <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <SwitchModeButton />
          <WeatherPage />
        </ThemeProvider>
      </ColorContext.Provider>
    </div>
  );
}

export default App;
