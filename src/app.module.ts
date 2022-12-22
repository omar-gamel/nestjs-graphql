import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './_common/graphql/graphql.provider';
import { ContextModule } from './_common/context/context.module';
import { Timestamp } from './_common/graphql/timestamp.scalar';
import { JSON } from './_common/graphql/json.scalar';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [ContextModule]
    })
  ],
  providers: [Timestamp, JSON]
})
export class AppModule {}
