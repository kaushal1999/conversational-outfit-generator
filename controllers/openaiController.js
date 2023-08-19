import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
// import { Configuration, OpenAIApi } from "openai"
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
import User from "../models/userModel.js"
// const openai = new OpenAIApi(configuration);
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationSummaryBufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";


const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know."
    ),
    new MessagesPlaceholder("history"),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  
  const model = new ChatOpenAI({ temperature: 0.9, verbose: true });





const chatbotController = async (req, res) => {
  try {

    const { text, id } = req.body;
    // console.log("user id ==========",id);
      

      let _id = mongoose.Types.ObjectId(id);
      // console.log("user id ==========",_id);
  

     const inputMessages= await User.findById(_id).select("inputMessages");
     const outputMessages= await User.findById(_id).select("outputMessages");
       
    const chatPromptMemory = new ConversationSummaryBufferMemory({
      llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
      maxTokenLimit: 10,
      returnMessages: true,
    });

    for (let index = 0; index < array.length; index++) {
      const element1 = array[index];
      const element2 = array[index];
      
    }

     await chatPromptMemory.saveContext(inputMessages,outpu);
    
     
      const chain = new ConversationChain({
        llm: model,
        memory: chatPromptMemory,
        prompt: chatPrompt,
      });
    // const data="response";
   
    const res1 = await chain.predict({ input: text });
// here res1 gives the output based on the previous chats and the current message that is text
    if (res1) {
      console.log("data==================",data);
      // save the text in i/p messages
      // res1 save it in o/ message of that user
      return res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


export default chatbotController
    