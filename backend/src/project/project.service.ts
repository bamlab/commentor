import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Project as ProjectEntity } from './project.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ProjectService extends TypeOrmCrudService<ProjectEntity> {
  constructor(
    @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
  ) {
    super(projectRepository);
  }
}
