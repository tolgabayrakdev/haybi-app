import Router from "./routes";
import { baseTheme } from "./assets/global/Theme-variable"
import { ThemeProvider } from "@mui/material/styles"


function App() {
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}

export default App;
