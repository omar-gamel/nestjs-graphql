import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { BaseResolver } from '../_common/graphql/graphql.resolver';

@Resolver(of => User)
export class UserResolver extends BaseResolver(User) {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Query(returns => User)
  findUser(@Args('id', { type: () => Int }) id: number): User {
    return this.userService.getUser(id);
  }
}
