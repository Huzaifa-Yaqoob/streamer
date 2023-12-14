import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
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
import { loginErrorMessages } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() user: LoginUser): Promise<ReturnUser> {
    try {
      const loggedInUser = await this.userService.login(
        user.email,
        user.password,
      );
      return loggedInUser;
    } catch (error) {
      console.log(error, 'At logging in user');
      if (error.message === loginErrorMessages.E) {
        throw new BadRequestException(loginErrorMessages.E);
      }
      if (error.message === loginErrorMessages.P) {
        throw new BadRequestException(loginErrorMessages.P);
      }
      throw new InternalServerErrorException();
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() user: RegisterUser): Promise<ReturnUser> {
    try {
      const newUser = await this.userService.register(
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
  async updateUsername(
    @Body() updateUsername: UpdateUsername,
  ): Promise<ReturnUsername> {
    try {
      return this.userService.update(
        updateUsername.id,
        updateUsername.username,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateAvatar(@Body() updateUserDto: any) {
    try {
      // return this.userService.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  async remove(@Body() body: { id: string }) {
    try {
      return this.userService.remove(body.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
