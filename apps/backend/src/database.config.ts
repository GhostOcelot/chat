import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Chatroom } from './entities/chatroom.entity';
import { User } from './entities/user.entity';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Message, Chatroom, User],
  synchronize: true,
};
