import { generateGqlResponseType } from 'src/_common/graphql/graphql-response.type';
import { User } from './user.model';

export const GqlUserResponse = generateGqlResponseType(User);
export const GqlUsersResponse = generateGqlResponseType(Array(User));
