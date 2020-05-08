import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TagModule } from '../tag/tag.module';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { TagService } from '../tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule, TagModule],
  controllers: [CommentController],
  providers: [CommentService, TagService],
  exports: [TypeOrmModule],
})
export class CommentModule {}
