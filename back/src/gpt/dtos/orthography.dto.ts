import { IsInt, IsOptional, IsString } from 'class-validator';

export class orthographyDto {
  @IsString()
  prompt: string;

  @IsInt()
  @IsOptional()
  maxTokens?: number;
}
