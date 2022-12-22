import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';
import { GqlUserResponse } from './user.response';
import { GqlBooleanResponse } from '../_common/graphql/graphql-response.type';

@Resolver(() => User)
export class UserResolver {
  @Query(returns => GqlBooleanResponse)
  findUser() {}
}
