import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from '../database.config';
import { ChatModule } from '../chat/chat.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), ChatModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
