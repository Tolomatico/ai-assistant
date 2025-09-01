import OpenAI from 'openai';

interface Options {
  prompt: string;
  originalImage?: string; // base64 o path
  maskImage?: string; // base64 o path para inpainting
}

export const imageGenerationCase = async (ai: OpenAI, options: Options) => {
  const { prompt } = options;

  const req = await ai.images.generate({
    model: "openai/dall-e-3",
    prompt,
    n: 1,
    size: '1024x1024',
  });

  console.log(req);
};
