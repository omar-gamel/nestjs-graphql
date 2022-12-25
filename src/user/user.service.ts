import { Injectable } from '@nestjs/common';
import { LangEnum } from './user.enum';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [
    { id: 1, name: 'John', favLang: LangEnum.EN },
    { id: 2, name: 'Jane', favLang: LangEnum.EN },
    { id: 3, name: 'Alex', favLang: LangEnum.EN },
    { id: 4, name: 'Anna', favLang: LangEnum.EN },
    { id: 5, name: 'Alex', favLang: LangEnum.EN }
  ];

  getUser(id: number): User {
    return this.users.find(user => user.id === id);
  }

  getUsers(): User[] {
    return this.users;
  }
}
