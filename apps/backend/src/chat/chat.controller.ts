import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('user-chatrooms/:userId')
  async getUsersChatrooms(@Param('userId') userId: string) {
    const chat = await this.chatService.getUserChatrooms(userId);

    return chat;
  }

  @Get('chatroom/:chatroomId')
  async getChatroomById(@Param('chatroomId') chatroomId: string) {
    const chat = await this.chatService.getChatroomById(chatroomId);

    return chat;
  }
}
