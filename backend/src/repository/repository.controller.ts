import { Controller, Get, Request } from '@nestjs/common';
import { Request as RequestType } from 'express';

import { Repository as RepositoryEntity } from './repository.entity';
import { RepositoryService } from './repository.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Crud({
  model: {
    type: RepositoryEntity,
  },
})
@Controller('repositories')
export class RepositoryController implements CrudController<RepositoryEntity> {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    public readonly service: RepositoryService,
  ) {}

  get base(): CrudController<RepositoryEntity> {
    return this;
  }

  @Get()
  async getUserRepositories(
    @Request()
    request: RequestType,
  ): Promise<RepositoryEntity[]> {
    if (request.cookies.access_token) {
      const userRepositories = await this.service.getUserCommentedRepositories(
        request.cookies.access_token,
      );
      return userRepositories;
    }
    return [];
  }
}
