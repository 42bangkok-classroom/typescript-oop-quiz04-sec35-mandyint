import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
@Injectable()
export class UserService {
  private file = 'data/users.json';

  test() {
    return [];
  }

  findAll(): IUser[] {
    const data = fs.readFileSync(this.file, 'utf-8');
    return JSON.parse(data);
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

    const filteredUser = {};

    fields.forEach((field) => {
      if (user[field] !== undefined) {
        filteredUser[field] = user[field];
      }
    });

    return filteredUser;
  }
}
