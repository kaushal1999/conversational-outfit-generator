import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ChatBot from "./pages/ChatBot";
import Preferences from "./pages/preferences";


function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const loggedIn = localStorage.getItem("authToken");
  const isUserPref = localStorage.getItem("isUserPref");

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Routes>
          <Route path="/" element={(loggedIn != null) ? <ChatBot /> :<Login />} />
          <Route path="/register" element={(loggedIn != null) ? <Preferences /> :<Register />} />
          <Route path="/login" element={ (loggedIn !== null && isUserPref !== false) ? <ChatBot /> : ((loggedIn !== null && isUserPref === false) ? <Preferences /> : <Login />)} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/preferences" element={<Preferences />} />

        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
