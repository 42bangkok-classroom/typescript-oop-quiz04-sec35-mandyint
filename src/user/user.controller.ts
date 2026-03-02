import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('test')
  getTest(){
    return this.appService.test();
  }
}