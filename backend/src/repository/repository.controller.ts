import { Controller, Get } from '@nestjs/common';

import { RepositoryService } from './repository.service';
import { ProviderRepositories } from '../auth/decorators/providerRepositories.decorator';
import { RepositoryDto } from './interfaces/Repository.dto';

@Controller('repositories')
export class RepositoryController {
  constructor(public readonly service: RepositoryService) {}

  @Get()
  async getUserRepositories(
    @ProviderRepositories() providerRepositories: RepositoryDto[],
  ): Promise<RepositoryDto[]> {
    return this.service.getUserCommentedRepositories(providerRepositories);
  }
}
