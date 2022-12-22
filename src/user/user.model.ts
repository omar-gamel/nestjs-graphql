import { Field, ID } from '@nestjs/graphql';
import { LangEnum } from './user.enum';

export class User {
  @Field(() => ID)
  id: string;

  @Field(() => LangEnum)
  favLang: LangEnum;
}
