import { Injectable } from '@nestjs/common';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';

@Injectable()
export class UserMoviesService {
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
