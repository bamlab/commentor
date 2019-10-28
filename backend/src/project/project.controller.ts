import { Controller, Get } from '@nestjs/common';

import { Project as ProjectEntity } from './project.entity';
import { ProjectService } from './project.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Crud({
  model: {
    type: ProjectEntity,
  },
})
@Controller('projects')
export class ProjectController implements CrudController<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity) private readonly tagRepository: Repository<ProjectEntity>,
    public readonly service: ProjectService,
  ) {}

  get base(): CrudController<ProjectEntity> {
    return this;
  }

  @Get('repositoryIds')
  async getProjects(): Promise<ProjectEntity[]> {
    const COMMENTOR_REPO_ID = 212067833;
    const EXEMPLE_REPO_ID = 186853002;
    return [{ id: COMMENTOR_REPO_ID, name: 'Commentor' }, { id: EXEMPLE_REPO_ID, name: 'Example' }];
  }
}
