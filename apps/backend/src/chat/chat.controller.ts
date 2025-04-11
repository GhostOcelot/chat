import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('users')
  async getUsers() {
    const chat = await this.chatService.getUsers();

    return chat;
  }

  @Post('chatroom')
  async createChatroom(@Body('usersIds') usersIds: string[]) {
    const chat = await this.chatService.createChatroom(usersIds);

    return chat;
  }
}
