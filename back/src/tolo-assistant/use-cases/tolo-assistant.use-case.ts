import axios from "axios";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

interface Message {
    role: "system" | "user" | "assistant" | "function";
    content: string;
}

interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string; 
  stream: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  eval_count: number;
}

export async function toloAssistant(messages: Message[],openai: OpenAI) {


  const systemPrompt = {
    role: "system",
    content:"Eres un asistente de ia llamado tolobot, tu trabajo es responder sobre el sitio web,el cual tiene secciones para traducir,corregir ortografía y generar comparaciones,ademas de la sección con el asistente que serias vos.Responde con amabilidad y respuestas cortas"
  }
  const messagesWithSystem = [systemPrompt, ...messages.map(i => ({
    role: i.role,
    content: i.content
  }))];


  const prompt = messagesWithSystem
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n") + "\nASSISTANT:";


  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: messagesWithSystem as ChatCompletionMessageParam[],
  });

  if(!response.choices[0].message.content){
    return "No se pudo realizar la respuesta";
  }

  return response.choices[0].message.content;


  // En local
  // const url = 'http://localhost:11434/api/generate';
  // const response = await axios.post<OllamaGenerateResponse>(url, {
  //   model: "llama3",
  //   prompt,
  //   stream: false,
  // });

  // return response.data.response;
}
