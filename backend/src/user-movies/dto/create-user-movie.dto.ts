import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserMovieDto {
  @MaxLength(25)
  @MinLength(1)
  @IsNotEmpty()
  movieName: string;
}
