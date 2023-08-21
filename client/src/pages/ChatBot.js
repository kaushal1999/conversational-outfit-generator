import React, { useState } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const ChatBot = () => {
  const scrollRef = useRef();
  const theme = useTheme();
  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  const [text, settext] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [loader, setloader] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      settext("");
      setloader(true);
      const id = localStorage.getItem("authToken");
      console.log("line 36");

      const data = await axios.post("/api/v1/openai/chatbot", { text, id });
      setloader(false);
      console.log(data);
      console.log("hits");
      let temp = [...messages];
      temp.push({
        message: text,
        fromSelf: true,
      });
      temp.push({
        message: data.data,
        fromSelf: false,
      });
      setMessages(temp);
    } catch (err) {
      setloader(false);
      setError(err.message);
    }
  };
  return (
    <>
      <Box
        width={"80vw"}
        p={"2rem"}
        m={"2rem auto"}
        borderRadius={5}
        sx={{ boxShadow: 5 }}
        backgroundColor={theme.palette.background.alt}
      >
        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <div className="chat-messages" style={{ width: "100%" }}>
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "recieved"
                  }`}
                >
                  <div
                    className="content "
                    style={{ backgroundColor: "#0071dc" }}
                  >
                    <p style={{ color: "#edf5fd" }}>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loader && (
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        )}
        {loader && (
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        )}

        <form onSubmit={handleSubmit}>
          <Typography variant="h3">Ask with Chatbot</Typography>

          <TextField
            placeholder="add your text"
            type="text"
            multiline={true}
            required
            margin="normal"
            fullWidth
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
          <div style={{ display: "flex" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Chat
            </Button>

            <Button
              onClick={handleLogout}
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Logout
            </Button>
          </div>
        </form>
      </Box>
    </>
  );
};

export default ChatBot;
