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

  createTag = async (tag: Pick<TagEntity, 'code' | 'description' | 'color' | 'oAuthLogin'>) => {
    const createdTag = await this.tagRepository.save(tag);
    return createdTag;
  };

  getByLogin = async (oAuthLogin: string) => {
    return this.tagRepository.find({ where: [{ oAuthLogin }, { isDefault: true }] });
  };

  updateById = async (
    tag: InputTag,
    tagId: number,
    oAuthLogin: string,
  ): Promise<TagEntity | void> => {
    await this.tagRepository.update({ id: tagId, oAuthLogin }, tag);
    const updatedTag = await this.tagRepository.findOne({ id: tagId });
    return updatedTag;
  };

  deleteTagById = async (id: number, oAuthLogin: string) => {
    return this.tagRepository.delete({ id, oAuthLogin, isDefault: false });
  };
}
