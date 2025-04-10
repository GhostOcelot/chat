import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { Message } from '../entities/message.entity';
import { Chatroom } from '../entities/chatroom.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chatroom, User])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
