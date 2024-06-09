import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// Convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

const predefinedMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content:
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What is a hobby you have recently started?||If you could have dinner with any historical figure, who would it be?||What is a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
  },
];

export async function POST(req: Request) {
  try {
    // Use predefined messages
    const geminiStream = await genAI
      .getGenerativeModel({ model: "gemini-pro" })
      .generateContentStream(buildGoogleGenAIPrompt(predefinedMessages));

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(geminiStream);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("AI unexpected error", error);
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}
