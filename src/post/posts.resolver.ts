import { Query, Resolver, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Post } from './posts.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { PostsService } from './posts.service';
import { BaseResolver } from '../_common/graphql/graphql.resolver';

@Resolver(of => Post)
export class PostsResolver extends BaseResolver(Post) {
  constructor(
    private readonly userSerive: UserService,
    private readonly postService: PostsService
  ) {
    super();
  }

  @Query(() => Post)
  async findPost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findPost(id);
  }

  @ResolveField('createdBy', () => User)
  getCreatedBy(@Parent() post: Post): User {
    const { userId } = post;
    return this.userSerive.getUser(userId);
  }
}
