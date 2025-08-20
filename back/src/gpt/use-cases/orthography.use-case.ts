import OpenAI from 'openai';

interface Options {
  prompt: string;
}
export interface OrthographyResponse {
  userScore: number;
  errors: string[];
  message: string;
}

export const orthographyCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: ` Te serán proveídos textos con posibles errores ortográficos y gramaticales.
                        Las palabras usadas deben estar en español,de no estarlo dar la solución,
                        debe existir en el diccionario de la real academia española,
                        por mas que exista la palabra analizar si esta bien implementada, de no estar bien implementada devolverlo como error,
                        Debes de responder en formato JSON,
                        tu tarea es corregirlos y retornar información soluciones,
                        también debes de dar un porcentaje de acierto por el usuario,
                        Si no hay errores, debes de retornar un mensaje de felicitaciones.
                        Ejemplo de salida:
                        {
                            userScore:number// 100 si esta perfecto,
                            errors:string[],//['error → solución',] debe ser un array,
                            message:string  //Usa texto y emojis para felicitar al usuario                      
                        } 
                                            
                        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const json = JSON.parse(
    completion.choices[0].message.content!,
  ) as OrthographyResponse;

  return json;
};
