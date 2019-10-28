import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormConfig from './ormconfig';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    AuthModule,
    CommentModule,
    TagModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
