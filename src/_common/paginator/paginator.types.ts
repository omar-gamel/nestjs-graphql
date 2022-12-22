import { ObjectType, Field, Int } from '@nestjs/graphql';

export interface PaginationRes<T> {
  items: T[];
  pageInfo: {
    page?: number;
    nextCursor?: string;
    beforeCursor?: string;
    hasNext: boolean;
    hasBefore: boolean;
  };
}

@ObjectType()
export abstract class PageInfo {
  @Field(type => Int, { nullable: true })
  page?: number;

  @Field(type => Int)
  limit: number;

  @Field({ nullable: true })
  nextCursor?: string;

  @Field({ nullable: true })
  beforeCursor?: string;

  @Field(type => Boolean)
  hasNext: boolean;

  @Field(type => Boolean)
  hasBefore: boolean;
}
