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
  senderId!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  chatroom!: Chatroom;

  @CreateDateColumn()
  timestamp!: Date;
}
