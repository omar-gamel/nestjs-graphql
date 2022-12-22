import { registerEnumType } from '@nestjs/graphql';

export enum LangEnum {
  EN = 'EN',
  AR = 'AR'
}
registerEnumType(LangEnum, { name: 'LangEnum' });
