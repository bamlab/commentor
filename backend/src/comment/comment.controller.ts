import { Controller, Body, Get } from '@nestjs/common';

import { CommentEvent } from './interfaces/comment.dto';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Crud({
  model: {
    type: Comment,
  },
})
@Controller('comments')
export class CommentController implements CrudController<Comment> {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    public readonly service: CommentService,
  ) {}

  get base(): CrudController<Comment> {
    return this;
  }

  @Override()
  createOne(@Body() commentEvent: CommentEvent) {
    return this.service.createComment({
      body: commentEvent.comment.body,
      filePath: commentEvent.comment.path,
      url: commentEvent.comment.url,
      commentor: commentEvent.comment.user.login,
      requester: commentEvent.pull_request.user.login,
      pullRequestUrl: commentEvent.pull_request.url,
      repositoryId: commentEvent.repository.id,
    });
  }

  @Get('projects')
  async getAllAvailableProjectIds(): Promise<number[]> {
    return this.service.getAvailableProjectIdsFromComments();
  }
}
