import { Controller, Body } from '@nestjs/common';

import { Tag } from './interfaces/tag.dto';
import { Tag as TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Crud({
  model: {
    type: TagEntity,
  },
})
@Controller('tags')
export class TagController implements CrudController<TagEntity> {
  constructor(
    @InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>,
    public readonly service: TagService,
  ) {}

  get base(): CrudController<TagEntity> {
    return this;
  }

  @Override()
  createOne(@Body() tag: Tag) {
    return this.service.createTag({
      code: tag.code,
      description: tag.description,
    });
  }
}
