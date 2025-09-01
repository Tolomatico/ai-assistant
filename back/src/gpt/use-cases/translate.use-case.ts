import OpenAI from 'openai';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';
interface Options {
  prompt: string;
  lang: string;
}

interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string; // Aquí es donde está la traducción
  stream: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  eval_count: number;
}

export const translateCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const url = 'http://localhost:11434/api/generate';

  const completion = await axios.post<OllamaGenerateResponse>(url, {
    model: 'llama3',
    prompt: `Traduce el siguiente texto al idioma ${lang}:${prompt},y que solo devuelvas la traduccion`,
    stream: false,
  });

  if (!completion?.data?.response) {
    throw new BadRequestException('No se pudo realizar la traducción');
  }

  /*  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
  });
*/
  return {
    message: completion.data.response,
  };
};
