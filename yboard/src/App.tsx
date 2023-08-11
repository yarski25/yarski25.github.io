import { ThemeProvider } from "@mui/material";
import "./App.scss";
import WeatherPage from "./components/pages/WeatherPage";
import { theme } from "./styles/theme";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <WeatherPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
