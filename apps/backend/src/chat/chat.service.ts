import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { Chatroom } from '../entities/chatroom.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chatroom)
    private readonly chatroomRepo: Repository<Chatroom>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async saveMessage(senderId: string, content: string, chatroomId: string) {
    const chatroom = await this.chatroomRepo.findOne({
      where: { id: chatroomId },
    });

    if (!chatroom) {
      throw new NotFoundException('Chatroom not found');
    }

    const msg = this.messageRepo.create({ senderId, content, chatroom });
    return this.messageRepo.save(msg);
  }

  getRecentMessages() {
    return this.messageRepo.find({
      order: { timestamp: 'DESC' },
      take: 50,
    });
  }

  async getUserChatrooms(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['chatrooms'],
    });

    if (!user) {
      throw new NotFoundException('Chatroom not found');
    }

    return user;
  }

  async getChatroomById(chatroomId: string) {
    const chat = await this.chatroomRepo.findOne({
      where: { id: chatroomId },
      relations: ['participants', 'messages'],
    });

    if (!chat) {
      throw new NotFoundException('Chatroom not found');
    }

    return chat;
  }

  async getUsers() {
    const users = await this.userRepo.find();

    if (!users) {
      throw new NotFoundException('users not found');
    }

    return users;
  }

  async createChatroom(usersIds: string[]) {
    try {
      if (!usersIds || usersIds.length === 0) {
        throw new NotFoundException('No participant IDs provided');
      }

      const users = await this.userRepo.find({
        where: { id: In(usersIds) },
      });

      if (users.length !== usersIds.length) {
        throw new NotFoundException('One or more users not found');
      }

      const chatroom = this.chatroomRepo.create({ participants: users });

      return this.chatroomRepo.save(chatroom);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Chatroom creation failed:', error);
      throw new InternalServerErrorException('Failed to create chatroom');
    }
  }
}
