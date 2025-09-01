import { Module } from '@nestjs/common';
import { GptModule } from './gpt/gpt.module';
import { ConfigModule } from '@nestjs/config';
import { ToloAssistantModule } from './tolo-assistant/tolo-assistant.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GptModule,
    ToloAssistantModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/tolo-assistant'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
