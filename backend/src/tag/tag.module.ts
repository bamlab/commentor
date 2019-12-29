import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TypeOrmModule],
})
export class TagModule {}
