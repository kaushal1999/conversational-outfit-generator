const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
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






exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const memory = new ConversationSummaryBufferMemory({
        llm: new OpenAI({ modelName: "text-davinci-003", temperature: 0 }),
        maxTokenLimit: 10,
      });
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Answer question similar to how yoda from star war would.
    //   Me: 'what is your name?'
    //   yoda: 'yoda is my name'
    //   Me: ${text}`,
    //   max_tokens: 300,
    //   temperature: 0.7,
    // });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
      message
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};



    