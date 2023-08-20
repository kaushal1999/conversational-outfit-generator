import React, { useState } from "react";
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import OpenAI from 'openai';

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
  
  const handleGeneration=async ()=> {
    const response = await OpenAI.createImage({
      prompt: messages[messages.length-1].message,
      n: 1,
      size: "256x256",
    });
    const image_url = response.data.data[0].url;
    console.log(image_url);
  }
  
  const handleLogout = () => {
    
      localStorage.clear()
      navigate("/")
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      settext("");
      setloader(true)
      const id = localStorage.getItem("authToken");
      console.log("line 36");

      const data = await axios.post("/api/v1/openai/chatbot", { text, id });
      setloader(false)
      console.log(data);
      console.log("hits");
      let temp = [...messages]
      temp.push({
        message: text,
        fromSelf: true
      });
      temp.push({
        message: data.data,
        fromSelf: false
      });
      setMessages(temp);
    } catch (err) {

      setloader(false)
      setError(err.message)
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



        {/* <Typography p={2}>{response}</Typography> */}
        <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${message.fromSelf ? "sended" : "recieved"
                    }`}
                >
                  <div className="content " style={{backgroundColor: "black"}}>
                    <p style={{color: "white"}}>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* </Card> */}

        {loader &&
          <Placeholder as="p" animation="wave">
            <Placeholder xs={12} />
          </Placeholder>
        }
        {loader && <Placeholder as="p" animation="wave">
          <Placeholder xs={12} />
        </Placeholder>
        }


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
          <div style={{display:"flex"}}>
          <Button
           onClick={handleLogout}
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Logout
        </Button>
        <Button
           onClick={handleGeneration}
          style={{marginLeft:"10px"}}
          //  onClick={}
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Generate Images
        </Button>
          </div>
         
        {/* <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography> */}
        </form>


      </Box>
    </>
  );
};

export default ChatBot;





