import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { matchPassword } from 'src/lib/password-hashed';
import { Jwt } from 'src/providers/jwt/jwt';
import {
  type ReturnUser,
  type ReturnAvatarUrl,
  type ReturnUsername,
} from './user-types';
import { $File } from 'src/providers/upload/file-upload';

export const loginErrorMessages = {
  E: 'Email is not registered',
  P: 'Password is incorrect',
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwt: Jwt,
    private readonly file: $File,
  ) {}

  async login(email: string, password: string): Promise<ReturnUser> {
    const foundUser = await this.userModel.findOne({ email });
    if (!foundUser) {
      throw new Error(loginErrorMessages.E);
    }
    const isMatch = await matchPassword(password, foundUser.password);
    if (!isMatch) {
      throw new Error(loginErrorMessages.P);
    }

    const token = await this.jwt.assignToken({
      userID: foundUser._id.toString(),
    });

    return {
      email: foundUser.email,
      username: foundUser.username,
      avatarUrl: foundUser.avatarUrl,
      token,
    };
  }

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<ReturnUser> {
    const newUser = await this.userModel.create({ email, username, password });
    const token = await this.jwt.assignToken({
      userID: newUser._id.toString(),
    });
    return {
      email: newUser.email,
      username: newUser.username,
      avatarUrl: newUser.avatarUrl,
      token,
    };
  }

  async updateUsername(
    id: string,
    newUsername: string,
  ): Promise<ReturnUsername> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        username: newUsername,
      },
      { new: true },
    );
    return { username: updatedUser.username };
  }

  async updateAvatar(id: string, avatarName: string): Promise<ReturnAvatarUrl> {
    const newAvatarUrl = this.file.getPublicFileUrl(avatarName);
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      {
        avatarUrl: newAvatarUrl,
      },
      { new: true },
    );
    return { avatarUrl: updatedUser.avatarUrl };
  }

  async removeAvatar(id: string) {
    console.log(id);
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      console.log(id, 'at remove user service');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
