import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  type ReturnUser,
  type ReturnAvatarUrl,
  type ReturnUsername,
} from './user-types';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserService } from './user.service';
import { UpdateUsername } from './dto/update-username.dto';
import { LoginUser } from './dto/login-user.dto';
import { RegisterUser } from 'src/user/dto/register-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarFilePipePipe } from '../pipes/avatar-file-pipe/avatar-file-pipe.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() user: LoginUser): Promise<ReturnUser> {
    try {
      const loggedInUser = this.userService.login(user.email, user.password);
      return loggedInUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() user: RegisterUser): Promise<ReturnUser> {
    try {
      const newUser = this.userService.register(
        user.email,
        user.username,
        user.password,
      );
      return newUser;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('This email is already registered.');
      }
      throw new InternalServerErrorException();
    }
  }

  @Patch('username')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateUsername(
    @Body() updateUsername: UpdateUsername,
    @Query('id') id: string,
  ): Promise<ReturnUsername> {
    try {
      return this.userService.updateUsername(id, updateUsername.username);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @Query('id') id: string,
    @UploadedFile(new AvatarFilePipePipe())
    file: Express.Multer.File,
  ): Promise<ReturnAvatarUrl> {
    try {
      console.log('I ma here');
      return this.userService.updateAvatar(id, file);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete('avatar')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  removeAvatar(@Query('id') id: string) {
    try {
      return this.userService.removeAvatar(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@Query('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
