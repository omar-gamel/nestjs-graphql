import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, GraphQLError } from 'graphql';

@Scalar('Timestamp')
export class Timestamp implements CustomScalar<number, number> {
  name: 'Timestamp';
  description: 'A unix timestamp in milliseconds';

  serialize(value) {
    let v = value;
    if (!(v instanceof Date) && typeof v !== 'number')
      throw new TypeError(`Value is not an instance of Date or Date timestamp: ${v}`);
    if (v instanceof Date) v = v.getTime();
    if (Number.isNaN(v)) throw new TypeError(`Value is not a valid Date: ${v}`);
    return v;
  }

  parseValue(value) {
    let v = Number(value);
    return v;
  }

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT)
      throw new GraphQLError(`Can only parse timestamps to dates but got a: ${ast.kind}`);
    return this.parseValue(ast.value);
  }
}
