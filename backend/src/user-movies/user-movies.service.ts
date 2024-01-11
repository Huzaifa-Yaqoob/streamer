import {
  Injectable,
  BadRequestException,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { UserMovie } from './schema/user-movie.schema';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { $File } from 'src/providers/file/file-func';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class UserMoviesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserMovie.name) private userMovieModel: Model<UserMovie>,
    private readonly file: $File,
  ) {}

  async upload(id: string, movieName: string, movie: Express.Multer.File) {
    const user = await this.userModel.findById(id);
    // checking user limit of uploading movie it`s 20
    if (user.userMovies && user.userMovies.length === 20) {
      throw new BadRequestException(
        'Your limit exceed. You can only have 20 movies at a time.',
      );
    }
    // getting file unique name and it`s path.
    const movieFileInfo = this.file.getFilePathAndName(
      movie.originalname,
      'private',
    );
    // saving file with the path.
    const isSaved = await this.file.fileUpload(movie, movieFileInfo.path);
    // if file saved then store it`s display name and unique name in DB
    if (isSaved) {
      const newMovie = await this.userMovieModel.create({
        movieDisplayName: movieName,
        movieName: movieFileInfo.name,
      });
      // if data saved in db
      if (newMovie) {
        await user.updateOne({
          $push: { userMovies: newMovie._id },
        });
      }
    }

    return { success: true };
  }

  async findAll(id: string) {
    const user = await this.userModel.findById(id).populate({
      path: 'userMovies',
      select: '_id movieName movieDisplayName',
      options: { sort: { createdAt: -1 } },
    });
    return user.userMovies;
  }

  findOne(id: string) {
    console.log(id);

    return {};
  }

  async rename(id: string, updateUserMovieDto: UpdateUserMovieDto) {
    await this.userMovieModel.findByIdAndUpdate(id, {
      movieDisplayName: updateUserMovieDto.movieName,
    });
    return { success: true };
  }

  async remove(id: string, userId: string) {
    const movieData = await this.userMovieModel.findById(id);
    if (!movieData) {
      return { success: true };
    }
    const path = this.file.getFilePath(movieData.movieName, 'private');
    const isDeleted = await this.file.deleteFile(path);
    if (isDeleted) {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { userMovies: id },
      });
      await movieData.deleteOne({ _id: id });
    }

    return { success: true };
  }
}
