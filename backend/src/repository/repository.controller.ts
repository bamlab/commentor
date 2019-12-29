import { Controller, Get } from '@nestjs/common';

import { Repository as RepositoryEntity } from './repository.entity';
import { RepositoryService } from './repository.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubRepository } from './interfaces/repository.dto';
import { GithubRepositories } from './decorators/GithubRepositories.decorator';

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
    @GithubRepositories() githubRepositories: GithubRepository[],
  ): Promise<RepositoryEntity[]> {
    return this.service.getUserCommentedRepositories(githubRepositories);
  }
}
