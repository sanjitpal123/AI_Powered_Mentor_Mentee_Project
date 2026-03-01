import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCmN_bEAi4aQACumZYyYWCAFCvd12hLypU",
});

async function AiAsk(content) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ type: "text", text: content }],
    });

    console.log(response.candidates[0].content);
    return response.candidates[0].content;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export default AiAsk;
