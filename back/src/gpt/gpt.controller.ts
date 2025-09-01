import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GptService } from './gpt.service';
import {
  ImageGenerationDto,
  orthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import type { Response } from 'express';
import { diskStorage } from 'multer';

// Validador personalizado para tipos de archivo de audio
class AudioFileTypeValidator {
  isValid(file: Express.Multer.File): boolean {
    const allowedMimeTypes = [
      'audio/mpeg', // mp3
      'audio/mp4', // mp4 audio
      'audio/x-m4a', // m4a
      'audio/aac', // aac
      'audio/wav', // wav
      'audio/ogg', // ogg
    ];

    const allowedExtensions = ['.mp3', '.mp4', '.m4a', '.aac', '.wav', '.ogg'];

    // Verificar por MIME type
    if (allowedMimeTypes.includes(file.mimetype)) {
      return true;
    }

    // Verificar por extensión como respaldo
    const fileExtension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'));
    return allowedExtensions.includes(fileExtension);
  }
}

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(@Body() orthographyDto: orthographyDto) {
    return this.gptService.ortographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      res.write(piece);
    }
    res.end();
  }

  @Post('translate')
  async translate(@Body() translateDto: TranslateDto) {
    return await this.gptService.translate(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response,
  ) {
    const filepath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(filepath);
  }

  @Get('text-to-audio/:fileId')
  getTextToAudio(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = this.gptService.textToAudioGetter(fileId);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK);
    res.sendFile(file);
  }

  @Post('audio-to-text')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, callback) => {
          const fileExtension = file.originalname.split('.').pop();
          const fileName = `${new Date().getTime()}.${fileExtension}`;
          return callback(null, fileName);
        },
      }),
    }),
  )
  async audioToText(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000 * 1024 * 5,
            message: 'El archivo es mayor a 5mb',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    audioFile: Express.Multer.File,
  ) {
    // Validación personalizada del tipo de archivo
    const audioValidator = new AudioFileTypeValidator();
    if (!audioValidator.isValid(audioFile)) {
      throw new Error(
        'Solo se permiten archivos de audio: mp3, mp4, m4a, aac, wav, ogg',
      );
    }

    return this.gptService.audioToText(audioFile);
  }

  @Post('image-generation')
  imageGeneration(@Body() imageGenerationDto: ImageGenerationDto) {
    return this.gptService.imageGeneration(imageGenerationDto);
  }
}
