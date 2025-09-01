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
    MongooseModule.forRoot(process.env.MONGO_URL!),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
