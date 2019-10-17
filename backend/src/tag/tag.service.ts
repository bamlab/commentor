import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag as TagEntity } from './tag.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InputTag } from './interfaces/tag.dto';

@Injectable()
export class TagService extends TypeOrmCrudService<TagEntity> {
  constructor(@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>) {
    super(tagRepository);
  }

  createTag = async (tag: Pick<TagEntity, 'code' | 'description' | 'color'>) => {
    const createdTag = await this.tagRepository.save(tag);
    return createdTag;
  };

  updateById = async (tag: InputTag, tagId: number): Promise<TagEntity | void> => {
    const result = await this.tagRepository.update(tagId, tag);
    if (result.affected > 0) {
      const updatedTag = await this.tagRepository.findOne({ id: tagId });
      return updatedTag;
    }
  };

  deleteTagById = async (id: number) => {
    return this.tagRepository.delete(id);
  };
}
