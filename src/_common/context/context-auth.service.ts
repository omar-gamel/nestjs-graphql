import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from 'src/user/user.model';
import { ConfigService } from '@nestjs/config';
import { LangEnum } from 'src/user/user.enum';
import { isISO31661Alpha2 } from 'class-validator';
import { IContextAuthService } from './context-auth.interface';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class ContextAuthService implements IContextAuthService {
  constructor(private readonly config: ConfigService) {}

  getAuthToken(req: Request): string {
    if (req && req.headers && (req.headers.authorization || req.headers.Authorization)) {
      let auth: string;
      if (req.headers.authorization) auth = req.headers.authorization;
      if (req.headers.Authorization) auth = <string>req.headers.Authorization;
      return auth.split(' ')[1];
    }
    return null;
  }

  getTimezone(timezoneAsString = '+02:00') {
    if (timezoneAsString.search(/\-|\+/) < 0) timezoneAsString = '+02:00';
    const mathOperation = timezoneAsString.slice(0, 1);
    const value = timezoneAsString.replace(mathOperation, '');
    const hours = isNaN(Number(value.split(':')[0])) ? 2 : Number(value.split(':')[0]);
    const minutes = isNaN(value as any)
      ? 0
      : isNaN(Number(value.split(':')[1]))
      ? 0
      : Number(value.split(':')[1]);
    return { minusSign: mathOperation === '-', hours, minutes };
  }

  async getUserFromReqHeaders(req: Request): Promise<User> {
    let token = this.getAuthToken(req);
    if (!token) return null;
    let { userId } = <TokenPayload>jwt.verify(token, this.config.get('JWT_SECRET'));
    // Find User By ( UserId ) From DB And Return ..
    return {
      id: 1,
      name: 'John',
      favLang: LangEnum.AR
    };
  }

  getLocale(req: Request): { lang: LangEnum; country: string } {
    if (!req) return { lang: LangEnum.EN, country: 'EG' };
    let locale = <string>req.headers.lang || 'eg-en';
    let country = locale.split('-')[0].toUpperCase();
    if (!country || !isISO31661Alpha2(country)) country = 'EG';
    let lang = locale.split('-')[1] === 'ar' ? LangEnum.AR : LangEnum.EN;
    return { lang, country };
  }
}
