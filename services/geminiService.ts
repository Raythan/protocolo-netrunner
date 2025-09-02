
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateMessageWithAI = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is not configured. Please set the API_KEY environment variable.";
  }

  if (!prompt.trim()) {
    return "Please provide a valid prompt.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an assistant that writes friendly, natural-sounding, and concise messages for WhatsApp. The message should be ready to send."
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating message with AI:", error);
    return "Sorry, I couldn't generate a message right now. Please try again later.";
  }
};
