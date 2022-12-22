import { LangEnum } from 'src/user/user.enum';
import { Timezone } from './graphql-response.type';
import { User } from 'src/user/user.model';

export interface GqlContext {
  currentUser?: User;
  req: Request;
  lang: LangEnum;
  country: string;
  timezone: Timezone;
}
