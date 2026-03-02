import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private filePath = 'data/users.json';

  test() {
    return [];
  }

  findAll(): IUser[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');

    const users = JSON.parse(data) as IUser[];

    return users;
  }

  findOne(id: string, fields?: string[]) {
    const users = this.findAll();

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!fields) {
      return user;
    }

    const filteredUser: Partial<IUser> = {};

    fields.forEach((field) => {
      if (user[field as keyof IUser] !== undefined) {
        filteredUser[field as keyof IUser] = user[field as keyof IUser];
      }
    });

    return filteredUser;
  }
}
