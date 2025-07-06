import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPEN_AI_API_KEY is not set in the environment variables.");
}

export const client = new OpenAI();