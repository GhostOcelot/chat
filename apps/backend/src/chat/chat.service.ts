import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>
  ) {}

  saveMessage(sender: string, content: string) {
    const msg = this.messageRepo.create({ sender, content });
    return this.messageRepo.save(msg);
  }

  getRecentMessages() {
    return this.messageRepo.find({
      order: { timestamp: 'DESC' },
      take: 50,
    });
  }
}
