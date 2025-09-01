import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QuestionDto {
  @IsString()
  @IsOptional()
  threadId?: string;
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
