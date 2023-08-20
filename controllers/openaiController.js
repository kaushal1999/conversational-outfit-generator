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

    const user = await User.findById(_id);
    // const inputMessages = await User.findById(_id).select("inputMessages");
    // const outputMessages = await User.findById(_id).select("outputMessages");
    // const userPref = await User.findById(_id);
    let inputMessages = user.inputMessages;
    let outputMessages = user.outputMessages;
    const userPref = user.userPref[0];

    const chatPromptMemory = new ConversationSummaryBufferMemory({
      llm: new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 }),
      maxTokenLimit: 500,
      returnMessages: true,
    });

    let inputStr = "";
    let outputStr = "";

    for (let index = 0; index < inputMessages.length; index++) {
      inputStr = inputMessages[index];
      outputStr = outputMessages[index];
      await chatPromptMemory.saveContext({ input: inputStr }, { output: outputStr });
    }

    // if (inputMessages.length > 0) {
    //   await chatPromptMemory.saveContext({ input: inputStr }, { output: outputStr });
    // }

   
    if (userPref) {
      // await chatPromptMemory.saveContext({ input: userPref[0] }, { output: userPref[1] });
      await chatPromptMemory.saveContext({ input: userPref }, { output: "Understood! I have saved the user details you provided for future reference as a personalized outfit suggester. When you have specific fashion-related queries or need personalized outfit suggestions in the future, feel free to ask, and I'll use these details to provide tailored recommendations." });
    }

    const chain = new ConversationChain({
      llm: model,
      memory: chatPromptMemory,
      prompt: chatPrompt,
    });

    // const data="response";
    // let result = "";
    // if (userPref) {
      const result = await chain.predict({ input: text });

      // here res1 gives the output based on the previous chats and the current message that is text
      if (result) {
        console.log("result==================", result);
        inputMessages.push(text);
        outputMessages.push(result);
        // save the text in i/p messages
        user.inputMessages = inputMessages;
        // res1 save it in o/ message of that user
        user.outputMessages = outputMessages;

        try {
          // Save the updated user object back to the database
          const updatedUser = await user.save();  // saving to database
          return res.status(200).send(result);
        } catch (error) {
          res.status(500).json(err);
        }

        // return res.status(200).send(res);
      }
    // } else {
    //   return res.status(404).send("Please First Fill the User prefernces Form");
    // }


  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


export default chatbotController
