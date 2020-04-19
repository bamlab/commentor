import { Controller, Body, Delete, Param, Put, Get, Post } from '@nestjs/common';
import { GithubLogin } from '../auth/decorators/githubLogin.decorator';

import { InputTag } from './interfaces/tag.dto';
import { Tag as TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(public readonly service: TagService) {}

  @Post()
  createOne(@Body() inputTag: InputTag, @GithubLogin() githubLogin: string) {
    return this.service.createTag({
      code: inputTag.code,
      description: inputTag.description,
      color: inputTag.color,
      githubLogin,
    });
  }

  @Get()
  getAuthenticatedTags(@GithubLogin() githubLogin: string) {
    return this.service.getByGithubLogin(githubLogin);
  }

  @Delete(':id/delete')
  async deleteTagById(@Param('id') id: string, @GithubLogin() githubLogin: string) {
    const idNumber = Number(id);
    return this.service.deleteTagById(idNumber, githubLogin);
  }

  @Put(':id/update')
  async updateById(
    @Param('id') id: string,
    @Body() inputTag: InputTag,
    @GithubLogin() githubLogin: string,
  ): Promise<any> {
    return this.service.updateById(inputTag, Number(id), githubLogin);
  }
}
