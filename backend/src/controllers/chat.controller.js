import OpenAI from "openai";
import { Chat } from "../models/chat.model.js";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const generateResponse = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;  

    if (!message) {
      return res.status(400).json({ message: "Enter message!" });
    }

    const response = await openai.chat.completions.create({
      model: "openrouter/elephant-alpha",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    await Chat.create({
      user: userId,
      message: message,
      response: reply
    });

    res.json({ reply });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export default generateResponse;