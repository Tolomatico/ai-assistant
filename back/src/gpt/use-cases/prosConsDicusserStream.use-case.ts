import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.8,
    max_tokens: 300,
    messages: [
      {
        role: 'system',
        content: `Se te dara una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato Markdown,
            los pros y contras deben estar en una lista,          
                        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
};
