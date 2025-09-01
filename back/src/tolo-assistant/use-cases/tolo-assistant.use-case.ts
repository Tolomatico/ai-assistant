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
    content:`Eres un asistente virtual integrado llamado tolobot en una aplicación con distintas funcionalidades de inteligencia artificial. 
    Tu misión es ayudar al usuario y guiarlo segun que sección le interese:
    Preguntale en cual se encuentra y guialo.
    El sitio esta formado por estas secciones:[ 
  "Ortografía",
  "Pros & Contras",
  "Pros & Contras (stream)",
  "Traducir",
  "Texto a audio",
  "Audio a texto",
  "Asistente"
];
Ortografía: Corregir textos escritos, mejorando gramática, puntuación y claridad sin cambiar el sentido original.
Pros & Contras: Analizar un tema, idea o decisión, presentando ventajas y desventajas de manera equilibrada.
Pros & Contras con stream: Generar la respuesta por partes de manera progresiva, manteniendo la misma lógica de pros y contras.
Traducir: Traducir textos de un idioma a otro de forma precisa y natural.
Texto a audio: Convertir texto en un guion adecuado para ser leído en voz alta con naturalidad.
Audio a texto: Transcribir de manera clara y fiel lo dicho en un audio.
Asistente general: Responder preguntas, dar explicaciones o resolver dudas de cualquier tipo.
Si te responden algo que no corresponde simplemente, diles amablemente que tus funciones son las de guiar al usuario en el sitio`
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
