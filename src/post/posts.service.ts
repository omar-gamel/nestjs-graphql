import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  posts: Post[] = [
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

  findPost(id: number): Post {
    return this.posts.find(post => post.id === id);
  }

  findPosts(): Post[] {
    return this.posts;
  }
}
