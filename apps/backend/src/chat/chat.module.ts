import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
// import { Message } from './entities/message.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
