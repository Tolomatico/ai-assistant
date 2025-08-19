
import { ElevenLabsClient} from '@elevenlabs/elevenlabs-js';
import * as fs from "fs"
interface Options {
  prompt?: string;
  audioFile:Express.Multer.File
}

export const audioToTextCase = async (elevenlabs:ElevenLabsClient ,options: Options) => {

  const { prompt,audioFile}=options


 const transcription = await elevenlabs.speechToText.convert({
  file: fs.createReadStream(audioFile.path),
  modelId: "scribe_v1", // Model to use, for now only "scribe_v1" is supported.
  tagAudioEvents: true, // Tag audio events like laughter, applause, etc.
  languageCode: "es", // Language of the audio file. If set to null, the model will detect the language automatically.
  diarize: true, // Whether to annotate who is speaking

});
return transcription

}
