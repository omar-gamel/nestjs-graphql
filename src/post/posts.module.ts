import {  Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [],
  providers: [PostsService, PostsResolver, UserService],
  exports: [PostsService]
})
export class PostsModule {}
