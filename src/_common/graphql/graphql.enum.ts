import { registerEnumType } from '@nestjs/graphql';

export enum SortEnum {
  ASC = 'createdAt',
  DESC = '-createdAt'
}

registerEnumType(SortEnum, {
  name: 'SortEnum'
});
