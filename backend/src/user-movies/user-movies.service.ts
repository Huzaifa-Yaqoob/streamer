import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { UserMovie } from './schema/user-movie.schema';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { $File } from 'src/providers/upload/file-upload';

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
    const user = await this.userModel.findById(id);
    return `This action returns all userMovies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMovie`;
  }

  update(id: number, updateUserMovieDto: UpdateUserMovieDto) {
    return `This action updates a #${id} userMovie`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMovie`;
  }
}
