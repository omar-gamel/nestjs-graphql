import { Resolver, Query } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Post } from '../../post/posts.model';
import { User } from '../../user/user.model';
import { LangEnum } from '../../user/user.enum';

const posts: Post[] = [
  {
    id: 1,
    title: 'This is Second Test post',
    content: 'Second post content',
    isDone: false,
    userId: 1
  },
  {
    id: 2,
    title: 'Third post',
    content: 'Third post content',
    isDone: false,
    userId: 2
  },
  {
    id: 3,
    title: 'Fourth post',
    content: 'Fourth post content',
    isDone: false,
    userId: 3
  },
  {
    id: 4,
    title: 'Fifth post',
    content: 'Fifth post content',
    isDone: false,
    userId: 5
  },
  {
    id: 5,
    title: 'This is my First Test post',
    content: 'First post content',
    isDone: false,
    userId: 4
  }
];

const users: User[] = [
  { id: 1, name: 'John', favLang: LangEnum.EN },
  { id: 2, name: 'Jane', favLang: LangEnum.EN },
  { id: 3, name: 'Alex', favLang: LangEnum.EN },
  { id: 4, name: 'Anna', favLang: LangEnum.EN },
  { id: 5, name: 'Alex', favLang: LangEnum.EN }
];

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  // The isAbstract: true property indicates that SDL (Schema Definition Language statements) shouldn't be generated for this class.
  // Note, you can set this property for other types as well to suppress SDL generation.

  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    constructor() {}

    @Query(type => [classRef], { name: `findAll${classRef.name}` })
    async findAll(): Promise<T[]> {
      return this.find<T>(classRef.name);
    }

    find<T>(type: string): T[] {
      if (classRef.name === 'Post') return <T[]>posts;
      if (classRef.name === 'User') return <T[]>users;
    }
  }

  return BaseResolverHost;
}
