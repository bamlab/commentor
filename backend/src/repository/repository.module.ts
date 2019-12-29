import { Module } from '@nestjs/common';

import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';

import { CommentModule } from '../comment/comment.module';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [CommentModule],
  controllers: [RepositoryController],
  providers: [RepositoryService, CommentService],
  exports: [],
})
export class RepositoryModule {}
