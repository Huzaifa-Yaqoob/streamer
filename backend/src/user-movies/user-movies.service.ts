import { Injectable } from '@nestjs/common';
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
    // @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserMovie.name) private userMovieModel: Model<UserMovie>,
    private readonly file: $File,
  ) {}
  create(createUserMovieDto: CreateUserMovieDto) {
    console.log('yeah it`s working');
    return 'This action adds a new userMovie';
  }

  findAll() {
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
