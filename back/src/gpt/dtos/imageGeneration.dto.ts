import { IsOptional, IsString } from 'class-validator';

export class ImageGenerationDto {
  @IsString()
  prompt: string;
  @IsString()
  @IsOptional()
  originalImage?: string;
  @IsString()
  @IsOptional()
  maskImage?: string;
}
