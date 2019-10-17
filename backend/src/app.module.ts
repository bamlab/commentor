import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, CommentModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
