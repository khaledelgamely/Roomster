import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/cairo/600.css"; // Specify weight
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { blue, green } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import store from "./store/store.jsx";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/js/bootstrap.bundle.js";



let theme = createTheme({
  typography: {
    "fontFamily": `Cairo`,
    "fontSize": 17,
    allVariants: {
      textTransform: 'capitalize',
    },
  },
  textTransform: "initial",
  palette: {
    primary: {
      main: green[500],
    },
    blue: {
      main: blue[500],
    },
    secondary: {
      main: grey[50],
    },
    // mode: "dark",
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
