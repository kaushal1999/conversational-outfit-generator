import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Summary from "./pages/Summary";
import Paragraph from "./pages/Paragraph";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import ScifiImage from "./pages/ScifiImage";
import Preferences from "./pages/preferences";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const loggedIn = localStorage.getItem("authToken");

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={(loggedIn != null) ? <ChatBot /> :<Login />} />
          <Route path="/register" element={(loggedIn != null) ? <ChatBot /> :<Register />} />
          <Route path="/login" element={ (loggedIn != null) ? <ChatBot /> :  <Login />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
