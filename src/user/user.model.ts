import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LangEnum } from './user.enum';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => LangEnum, { nullable: true })
  favLang?: LangEnum;
}
