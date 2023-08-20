import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
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
// import jwt from 'jsonwebtoken'

const ChatBot = () => {
  const scrollRef = useRef();
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  //register ctrl
  const handleLogout = () => {
    
      localStorage.clear()
      navigate("/")
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const decoded = jwt.verify(localStorage.getItem("authToken"), "ACCESSTOKEN");
      const id = localStorage.getItem("authToken");
      console.log("line 36");
      const  data  = await axios.post("/api/v1/openai/chatbot", {text,id});
      console.log(data);
      console.log("hits");
      let temp=[...messages]
      temp.push({
        message:text,
        fromSelf:true
      });
      temp.push({
        message:data.data,
        fromSelf:false
      });
      setMessages(temp);
    } catch (err) {
      console.log(error);
      // if (err.response.data.error) {
      //   setError(err.response.data.error);
      // } else if (err.message) {
      //   setError(err.message);
      // }
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
    }
  };
  return (
    <Box
      // style = {{width : "500px"}}
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
      
      
       
          {/* <Typography p={2}>{response}</Typography> */}
          <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        {/* </Card> */}
      
    
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
        {/* <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography> */}
      </form>


    </Box>
  );
};

export default ChatBot;





