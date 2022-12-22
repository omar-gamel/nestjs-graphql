import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('JSON')
export class JSON implements CustomScalar<any, any> {
  name: 'JSON';
  description: `The JSON scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)`;

  serialize(value) {
    return value;
  }

  parseValue(value) {
    return value;
  }

  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT: {
        const value = Object.create(null);
        ast.fields.forEach(field => {
          value[field.name.value] = this.parseLiteral(field.value);
        });

        return value;
      }
      case Kind.LIST:
        return ast.values.map(this.parseLiteral);
      default:
        return null;
    }
  }
}
