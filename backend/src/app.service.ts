import { Injectable } from '@nestjs/common';
import { User } from './dto/create-user.dto';

@Injectable()
export class AppService {
  login() {
    return 'logged in';
  }

  register(user: User): string {
    return 'Hello World!';
  }
}
