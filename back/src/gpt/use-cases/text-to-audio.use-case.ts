import fs from 'fs';
import path from 'path';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

interface Options {
  prompt: string;
  voice: string;
}

const voices = {
  Rachel: '21m00Tcm4TlvDq8ikWAM',
  Clyde: '2EiwWnXFnvU5JabPnv8n',
  Aria: '9BWtsMINqrJLrRacOk9x',
  Roger: 'CwhRBWXzGAHq8TQ4Fs17',
  Sarah: 'EXAVITQu4vr4xnSDxMaL',
  Laura: 'FGY2WhTYpPnrIDTdsKH5',
  Thomas: 'GBv7mTt0atIp3Br8iCZE',
  Charlie: 'IKne3meq5aSn9XLyUdCD',
  George: 'JBFqnCBsd6RMkjVDRZzb',
  Callum: 'N2lVS1w4EtoT3dr4eOWO',
  River: 'SAz9YHcvj6GT2YYXdXww',
  Harry: 'SOYHLrjzK2X1ezoPC6cr',
  Liam: 'TX3LPaxmHKxFdv7VOQHJ',
  Charlotte: 'XB0fDUnXU5powFXDhCwa',
  Alice: 'Xb7hH8MSUJpSbSDYk0k2',
  Matilda: 'XrExE9yKIg1WjnnlVkGX',
  Will: 'bIHbv24MWmeRgasZH58o',
  Jessica: 'cgSgspJ2msm6clMCkdW9',
  Eric: 'cjVigY5qzO86Huf0OWal',
  Chris: 'iP95p4xoKVk53GoZ742B',
  Brian: 'nPczCjzI2devNBz1zQrb',
  Daniel: 'onwK4e9ZLuTAKqWW03F9',
  Lily: 'pFZP5JQG7iQjIQuC4Bku',
  Bill: 'pqHfZKP75CvOlQylNhV4',
};

export const textToAudioCase = async (
  elevenlabs: ElevenLabsClient,
  options: Options,
) => {
  const { prompt, voice } = options;

  const folderPath = path.resolve(__dirname, '../../../generated/audios');
  const speechFile = path.resolve(folderPath, `${Date.now()}.mp3`);
  fs.mkdirSync(folderPath, { recursive: true });

  const selectedVoice = voices[voice] ?? '21m00Tcm4TlvDq8ikWAM';

  const audio = await elevenlabs.textToSpeech.convert(selectedVoice, {
    text: prompt,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  });

  // Convertir el stream a buffer y guardar el archivo MP3
  const chunks: Uint8Array[] = [];
  for await (const chunk of audio) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  fs.writeFileSync(speechFile, buffer);

  return speechFile;

  // const {prompt,voice}=options

  // const voices={
  //     "nova":"nova",
  //     "alloy":"alloy",
  //      "ash": "ash",
  //      "ballad" :"ballad" ,
  //      "coral" :"coral" ,
  //      "echo":"echo",
  //       "sage": "sage",
  //     "shimmer": "shimmer",
  //         "verse": "verse"

  // }

  // const selectedVoice=voices[voice] ??"nova"

  // const mp3=await openAi.audio.speech.create({
  //     model:"tts-1",
  //     input:prompt,
  //     voice:selectedVoice,
  //     response_format:"mp3"
  // })

  // console.log(mp3)

  // return {
  //     prompt: prompt,
  //     selectedVoice: selectedVoice
  //
};
