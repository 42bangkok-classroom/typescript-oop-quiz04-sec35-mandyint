import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
@Injectable()
export class UserService {
  private file = 'data/users.json';

  test() {
    return [];
  }

  findAll(): IUser {
    const data = fs.readFileSync(this.file, 'utf-8');
    return JSON.parse(data);
  }
}
