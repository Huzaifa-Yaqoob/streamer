import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserMovieDto } from './create-user-movie.dto';

export class UpdateUserMovieDto extends PickType(CreateUserMovieDto, [
  'movieName',
]) {}
