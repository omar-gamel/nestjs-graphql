import { Inject, Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Request } from 'express';
import { join } from 'path';
import { IContextAuthService, IContextAuthServiceToken } from '../context/context-auth.interface';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    @Inject(IContextAuthServiceToken) private readonly authService: IContextAuthService
  ) {}

  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: true,
      introspection: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cache: 'bounded',
      persistedQueries: false,
      csrfPrevention: true,
      // installSubscriptionHandlers: true,
      context: async ({ req, extra }) => {
        let currentUser: User;

        // Auth for subscription connections
        if (extra && extra.currentUser) currentUser = extra.currentUser;
        else currentUser = await this.authService.getUserFromReqHeaders(<Request>req);

        // Get lang and   country (if exist)
        let locale = this.authService.getLocale(req);

        return {
          req,
          currentUser,
          lang: locale.lang,
          country: locale.country,
          timezone: this.authService.getTimezone(req ? req.headers.timezone : undefined)
        };
      },
      subscriptions: {
        'graphql-ws': {
          onConnect: async context => {
            const { connectionParams, extra } = context;
            if (connectionParams) {
              const req = { headers: connectionParams };
              (extra as any).currentUser = await this.authService.getUserFromReqHeaders(
                <Request>req
              );
            }
          }
        },
        'subscriptions-transport-ws': {
          onConnect: async connectionParams => {
            if (connectionParams) {
              const req = { headers: connectionParams };
              return {
                currentUser: await this.authService.getUserFromReqHeaders(<Request>req)
              };
            }
          },
          onDisconnect() {}
        }
      }
    };
  }
}
