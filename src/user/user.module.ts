import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { BaseResolver } from '../_common/graphql/graphql.resolver';
import { User } from './user.model';

@Module({
  imports: [],
  providers: [UserService,  UserResolver,]
})
export class UserModule {}
