import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
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
      throw new BadRequestException(loginErrorMessages.E);
    }
    const isMatch = await matchPassword(password, foundUser.password);
    if (!isMatch) {
      throw new BadRequestException(loginErrorMessages.P);
    }

    const token = await this.jwt.assignToken({
      userID: foundUser._id.toString(),
    });

    return {
      email: foundUser.email,
      username: foundUser.username,
      avatarUrl: this.file.getFileUrl(foundUser.avatarUrl, 'public'),
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
      avatarUrl: this.file.getFileUrl(newUser.avatarUrl, 'public'),
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

  async updateAvatar(
    id: string,
    avatar: Express.Multer.File,
  ): Promise<ReturnAvatarUrl> {
    const user = await this.userModel.findById(id);
    // first check if user has already have uploaded an avatar
    if (user.avatarUrl) {
      // if has avatar then first delete that file
      await this.file.deleteFile(
        this.file.getFilePath(user.avatarUrl, 'public'),
      );
    }
    // getting avatar name and path
    const avatarPath = this.file.getFilePathAndName(
      avatar.originalname,
      'public',
    );

    // storing file wih path
    await this.file.fileUpload(avatar, avatarPath.path);
    // updated user data in db
    const updatedUser = await user.updateOne(
      {
        avatarUrl: avatarPath.name,
      },
      { new: true },
    );
    return { avatarUrl: this.file.getFileUrl(updatedUser.avatarUrl, 'public') };
  }

  async removeAvatar(id: string) {
    const user = await this.userModel.findById(id);
    // first check id user has avatar or not
    if (!user.avatarUrl) {
      return { success: true };
    }

    // if user has avatar then delete it from file
    const isDeleted = await this.file.deleteFile(
      this.file.getFilePath(user.avatarUrl, 'public'),
    );

    // then updated database of that user in DB
    if (isDeleted) {
      await user.updateOne({
        $unset: { avatarUrl: 1 },
      });
    } else {
      throw new InternalServerErrorException('Problem while deleting a file');
    }

    return { success: true };
  }

  async remove(id: string) {
    try {
      console.log(id, 'at remove user account service');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
