import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { Message } from '../entities/message.entity';
import { Chatroom } from '../entities/chatroom.entity';
import { User } from '../entities/user.entity';
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chatroom, User])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
