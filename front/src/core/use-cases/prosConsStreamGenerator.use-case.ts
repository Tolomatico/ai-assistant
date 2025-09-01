export async function* prosConsStreamGeneratorCase(
  prompt: string,
  abortSignal: AbortSignal,
) {
  try {
    const req = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      },
    );

    if (!req.ok) {
      throw new Error('No se pudo realizar la comparación');
    }

    const reader = req.body?.getReader();

    if (!reader) {
      console.log('No se pudo leer el reader');
      return null;
    }

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }
  } catch (error) {
    return null;
  }
}
