import { Module } from '@nestjs/common';
import { ToloAssistantController } from './tolo-assistant.controller';
import { ToloAssistantService } from './tolo-assistant.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Message,
  MessageSchema,
  Thread,
  ThreadSchema,
} from './schemas/threadSchema';

@Module({
  controllers: [ToloAssistantController],
  providers: [ToloAssistantService],
  imports: [
    MongooseModule.forFeature([
      { name: Thread.name, schema: ThreadSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
})
export class ToloAssistantModule {}
