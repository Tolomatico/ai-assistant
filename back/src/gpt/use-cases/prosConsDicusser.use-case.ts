import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `Se te dara una pregunta y tu tarea es dar una respuesta con pros y contras,
            la respuesta debe de ser en formato Markdown,el idioma de la respuesta debe ser el mismo al del prompt del usuario
            los pros y contras deben estar en una lista,          
                        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message;
};
