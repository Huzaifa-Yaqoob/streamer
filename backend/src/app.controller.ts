import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  getHello(): string {
    return this.appService.login();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  postUser(@Body() user: User): string {
    this.appService.register(user);
    return 'posting user';
  }
}
