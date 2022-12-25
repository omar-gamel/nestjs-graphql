import { generateGqlResponseType } from 'src/_common/graphql/graphql-response.type';
import { Post } from './posts.model';

export const GqlPostResponse = generateGqlResponseType(Post);
export const GqlPostsResponse = generateGqlResponseType(Array(Post));
