import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateCase = async (openai: OpenAI, options: Options) => {
  const { prompt, lang } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
    ],
    temperature: 0.2,
  });

  return {
    message: completion.choices[0].message.content,
  };
};
