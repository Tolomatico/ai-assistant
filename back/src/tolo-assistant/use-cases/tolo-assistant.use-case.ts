import axios from "axios";
import { terms } from "../terms";

interface Message{
    role:string 
    content:string
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

export async function toloAssistant(messages: Message[]) {
  const systemPrompt = {
    role: "system",
    content: `Tu nombre es Sam, una abogada para una tienda en línea.

Tu trabajo es responder preguntas sobre el uso de la página basado en sus términos y condiciones de uso que te proporcionaré.

Se amable y cordial siempre.

Sita los títulos de los términos en tus respuestas si es posible.

Si no conoces la respuesta, puedes escalar el caso a: "Fernando Herrera fernando@google.com" o al teléfono de asistencia +1.800.123.3212.

Los prompts deben ser saludos de bienvenida cordiales.

Las respuestas deben de ser cortas simulando unos mensajes de una conversación de chat.

Pregunta el nombre de la persona para tratarlo de forma más personal.

Si conoces el nombre de la persona, por favor escríbelo. 
${terms}`
  };

  
  const messagesWithSystem = [systemPrompt, ...messages.map(i => ({
    role: i.role,
    content: i.content
  }))];


  const prompt = messagesWithSystem
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n") + "\nASSISTANT:";

  const url = 'http://localhost:11434/api/generate';
  const response = await axios.post<OllamaGenerateResponse>(url, {
    model: "llama3",
    prompt,
    stream: false,
  });

  return response.data.response;
}
