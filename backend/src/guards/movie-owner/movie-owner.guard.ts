import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class MovieOwnerGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    // id of a movie object
    const id = request.params.id;
    if (!id) {
      return false;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }
    try {
      const user = await this.userModel.findOne({
        _id: request.query.id,
        userMovies: { $in: [id] },
      });
      if (!user) {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
    return true;
  }
}
