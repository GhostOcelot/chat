import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => User, (user) => user.chatrooms, { cascade: true })
  @JoinTable()
  participants!: User[];

  @OneToMany(() => Message, (message) => message.chatroom, {
    cascade: true,
    nullable: true,
  })
  messages?: Message[];

  @CreateDateColumn()
  timestamp!: Date;
}
