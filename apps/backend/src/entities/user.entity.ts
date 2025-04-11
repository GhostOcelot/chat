import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Chatroom } from './chatroom.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  username?: string;

  @Column()
  password!: string;

  @ManyToMany(() => Chatroom, (chatroom) => chatroom.participants)
  chatrooms?: Chatroom[];

  @CreateDateColumn()
  timestamp!: Date;
}
