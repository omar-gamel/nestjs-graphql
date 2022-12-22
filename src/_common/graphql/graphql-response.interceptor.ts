import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGqlSuccessResponse } from './graphql-response.type';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisPubSub } from 'graphql-redis-subscriptions';

@Injectable()
export class GqlResponseInterceptor<T> implements NestInterceptor<T, IGqlSuccessResponse<T>> {
  constructor(@InjectPinoLogger(GqlResponseInterceptor.name) private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<IGqlSuccessResponse<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map(res => {
        this.logger.debug('********************************************************************');
        this.logger.debug(
          `${context.getHandler().name} operation takes ${Date.now() - now}ms at ${
            context.getClass().name
          } class`
        );
        this.logger.debug('********************************************************************');
        // To continue listening, subscription have to return PubSubAsyncIterator
        if (res && res.pubsub && res.pubsub instanceof RedisPubSub) return res;
        return {
          code: 200,
          success: true,
          message: 'Operation done successfully',
          data: res
        };
      })
    );
  }
}
