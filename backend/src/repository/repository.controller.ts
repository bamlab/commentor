import { Controller, Get } from '@nestjs/common';

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
  async getUserRepositories(): Promise<RepositoryEntity[]> {
    const userRepositories = await this.service.getUserRepositories();
    return userRepositories;
  }

  @Get('/hardcoded')
  async getRepositories(): Promise<RepositoryEntity[]> {
    const COMMENTOR_REPO_ID = 212067833;
    const EXEMPLE_REPO_ID = 186853002;
    const GBH_REPO_ID = 169545712;
    const ZEBET_REPO_ID = 197189213;
    const ADA_REPO_ID = 85054537;
    return [
      { id: COMMENTOR_REPO_ID, name: 'Commentor' },
      { id: EXEMPLE_REPO_ID, name: 'Example' },
      { id: GBH_REPO_ID, name: 'GBH' },
      { id: ZEBET_REPO_ID, name: 'Ze-Bet' },
      { id: ADA_REPO_ID, name: 'Ada' },
    ];
  }
}
