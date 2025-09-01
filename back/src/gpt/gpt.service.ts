import fs from 'fs';
import path from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  audioToTextCase,
  orthographyCase,
  prosConsDicusserCase,
  prosConsDicusserStreamCase,
  textToAudioCase,
  translateCase,
  imageGenerationCase,
} from './use-cases';
import {
  ImageGenerationDto,
  orthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import OpenAI from 'openai';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'http://localhost:11434/api/generate',
    // baseURL: 'https://openrouter.ai/api/v1',
  });

  private elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });

  async ortographyCheck(orthographyDto: orthographyDto) {
    return await orthographyCase(this.openai, orthographyDto);
  }
  async prosConsDicusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDicusserCase(this.openai, prosConsDiscusserDto);
  }
  async prosConsDicusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDicusserStreamCase(this.openai, prosConsDiscusserDto);
  }

  async translate(translateDto: TranslateDto) {
    return await translateCase(this.openai, translateDto);
  }

  async textToAudio(textToAudioDto: TextToAudioDto) {
    return await textToAudioCase(this.elevenLabs, textToAudioDto);
  }

  textToAudioGetter(fileId: string) {
    const pathfile = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${fileId}.mp3`,
    );

    const file = fs.existsSync(pathfile);
    if (!file)
      throw new NotFoundException('No se encontro el archivo de audio');
    return pathfile;
  }

  async audioToText(audioFile: Express.Multer.File) {
    return await audioToTextCase(this.elevenLabs, { audioFile: audioFile });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationCase(this.openai, imageGenerationDto);
  }
}
