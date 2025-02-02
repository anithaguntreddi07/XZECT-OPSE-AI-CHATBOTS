import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, data } = await req.json();

  const initialMessages = messages.slice(0, -1);
  const currentMessage = messages[messages.length - 1];

  const base64Images: string[] = JSON.parse(data.base64Images);

  // Note: GPT-4 model currently does not support direct image inputs.
  // For this example, we're only using the text content.
  const images = base64Images.map((base64Image) => ({
    type: 'image_url',
    image_url: base64Image,
  }));

  const response = await openai.chat.completions.create({
    model: 'gpt-4',  // Ensure you have access to this model
    stream: true,
    max_tokens: 150,
    messages: [
      ...initialMessages,
      {
        ...currentMessage,
        content: [{ type: 'text', text: currentMessage.content }, ...images],
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
