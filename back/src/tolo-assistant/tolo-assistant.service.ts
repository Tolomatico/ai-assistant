import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, Thread } from './schemas/threadSchema';
import { QuestionDto } from './dtos/question.dto';
import { toloAssistant } from './use-cases/tolo-assistant.use-case';
import OpenAI from 'openai';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export class ToloAssistantService {

private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    //baseURL: 'http://localhost:11434/api/generate',
     baseURL: 'https://openrouter.ai/api/v1',
  });

  private elevenLabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
  });
  
  constructor(
    @InjectModel(Thread.name) private threadModel: Model<Thread>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  

  async getThread(threadId: string) {
    if (!threadId || threadId.trim() === '') {
      return null;
    }
    const thread = await this.threadModel.findOne({ _id: threadId }).exec();
    return thread;
  }

  async createThread(){
    const thread = new this.threadModel({
      title:"Nuevo chat",
      messages:[]
    });
    await thread.save();
    return thread;
  }

  async createMessage(thread:string,role:string,content:string){
    const message=new this.messageModel({
      thread,
      role,
      content
    })
    await message.save()
    return message
  }

  async userQuestion(questionDto: QuestionDto) {
    const { prompt, threadId } = questionDto;
    const trimmedThreadId = threadId ? threadId.trim() : null;

    let thread;

    if (trimmedThreadId && trimmedThreadId !== '') {
      // Buscar thread existente
      thread = await this.getThread(trimmedThreadId);
      if (!thread) {
        thread = await this.createThread();
      }
    } else {
      thread = await this.createThread();   
    }

    const userMessage = await this.createMessage(String(thread._id),"user",prompt)
    
    // Usar thread._id en lugar de threadId
    thread = await this.threadModel.findByIdAndUpdate(
      thread._id,
      { $push: { messages: userMessage._id } },
      { new: true }
    ).populate("messages").exec();

   const systemResponse= await toloAssistant(thread.messages,this.openai)
    const systemMessage= await this.createMessage(String(thread._id),"system",systemResponse)
      thread = await this.threadModel.findByIdAndUpdate(
      thread._id,
      { $push: { messages: systemMessage._id } },
      { new: true }
    ).populate("messages").exec();

    return {
      threadId:thread._id,
      message:systemResponse
    }
  }
}
