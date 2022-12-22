import { RedisPubSub } from 'graphql-redis-subscriptions';

// Replace Graphql subscription pubsub with Redis pubsub
// https://stackoverflow.com/questions/43752073/graphql-subscriptions-max-listeners-exceeded-warning
export const redisPubSub = new RedisPubSub({
  connection: {
    connectTimeout: 200000,
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    retryStrategy: (times: number) => Math.min(times * 50, 2000)
  }
});

export const PubSub = {
  provide: 'PUB_SUB',
  useValue: redisPubSub
};
