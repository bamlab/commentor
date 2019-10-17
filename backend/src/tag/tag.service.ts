import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from './tag.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TagService extends TypeOrmCrudService<Tag> {
  constructor(@InjectRepository(Tag) private readonly tagRepository: Repository<Tag>) {
    super(tagRepository);
  }

  createTag = async (tag: Pick<Tag, 'code' | 'description'>) => {
    const createdTag = await this.tagRepository.save(tag);
    return createdTag;
  };
}
