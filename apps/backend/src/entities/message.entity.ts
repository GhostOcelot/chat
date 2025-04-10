import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Chatroom } from './chatroom.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  sender!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {
    onDelete: 'CASCADE',
  })
  chatroom!: Chatroom;

  @CreateDateColumn()
  timestamp!: Date;
}
