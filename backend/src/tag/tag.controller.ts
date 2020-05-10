import { Controller, Body, Delete, Param, Put, Get, Post } from '@nestjs/common';
import { OAuthLogin } from '../auth/decorators/oAuthLogin.decorator';

import { InputTag } from './interfaces/tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(public readonly service: TagService) {}

  @Post()
  createOne(@Body() inputTag: InputTag, @OAuthLogin() oAuthLogin: string) {
    return this.service.createTag({
      code: inputTag.code,
      description: inputTag.description,
      color: inputTag.color,
      oAuthLogin,
    });
  }

  @Get()
  getAuthenticatedTags(@OAuthLogin() oAuthLogin: string) {
    return this.service.getByLogin(oAuthLogin);
  }

  @Delete(':id/delete')
  async deleteTagById(@Param('id') id: string, @OAuthLogin() oAuthLogin: string) {
    const idNumber = Number(id);
    return this.service.deleteTagById(idNumber, oAuthLogin);
  }

  @Put(':id/update')
  async updateById(
    @Param('id') id: string,
    @Body() inputTag: InputTag,
    @OAuthLogin() oAuthLogin: string,
  ): Promise<any> {
    return this.service.updateById(inputTag, Number(id), oAuthLogin);
  }
}
