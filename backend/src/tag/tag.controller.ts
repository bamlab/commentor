import { Controller, Body, Delete, Param, Put } from '@nestjs/common';
import { GithubLogin } from '../auth/decorators/githubLogin.decorator';

import { InputTag } from './interfaces/tag.dto';
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
  createOne(@Body() inputTag: InputTag, @GithubLogin() githubLogin: string) {
    return this.service.createTag({
      code: inputTag.code,
      description: inputTag.description,
      color: inputTag.color,
    });
  }

  @Delete(':id/delete')
  async deleteTagById(@Param('id') id: string) {
    const idNumber = Number(id);
    return this.service.deleteTagById(idNumber);
  }

  @Put(':id/update')
  async updateById(@Param('id') id: string, @Body() inputTag: InputTag): Promise<any> {
    return this.service.updateById(inputTag, Number(id));
  }
}
