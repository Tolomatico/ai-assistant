import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Thread extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];

  @Prop({ type: String })
  title: string;
}
@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Thread', required: true })
  thread: Types.ObjectId;

  @Prop({ enum: ['system', 'user', 'assistant'], required: true })
  role: 'system' | 'user' | 'assistant';

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export const ThreadSchema = SchemaFactory.createForClass(Thread);
