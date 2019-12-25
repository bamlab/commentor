import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { RepositoryController } from './repository.controller';
import { Repository } from './repository.entity';
import { RepositoryService } from './repository.service';

import { CommentModule } from '../comment/comment.module';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Repository]), CommentModule],
  controllers: [RepositoryController],
  providers: [RepositoryService, CommentService],
  exports: [TypeOrmModule],
})
export class RepositoryModule {}
