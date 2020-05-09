import { Controller, Get } from '@nestjs/common';

import { RepositoryService } from './repository.service';
import { GithubRepositories } from '../auth/decorators/githubRepositories.decorator';
import { RepositoryDto } from './interfaces/Repository.dto';

@Controller('repositories')
export class RepositoryController {
  constructor(public readonly service: RepositoryService) {}

  @Get()
  async getUserRepositories(
    @GithubRepositories() githubRepositories: any[],
  ): Promise<RepositoryDto[]> {
    return this.service.getUserCommentedRepositories(githubRepositories);
  }
}
