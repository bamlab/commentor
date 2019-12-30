import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [TypeOrmModule],
})
export class CommentModule {}
