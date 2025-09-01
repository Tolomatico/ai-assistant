import { Body, Controller, Post } from '@nestjs/common';
import { ToloAssistantService } from './tolo-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('tolo-assistant')
export class ToloAssistantController {
  constructor(private readonly toloAssistantService: ToloAssistantService) {}

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {

    return this.toloAssistantService.userQuestion(questionDto);
  }
}
