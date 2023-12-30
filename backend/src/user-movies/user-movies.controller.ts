import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user-movies')
export class UserMoviesController {
  constructor(private readonly userMoviesService: UserMoviesService) {}

  @Post()
  create(@Body() createUserMovieDto: CreateUserMovieDto) {
    return this.userMoviesService.create(createUserMovieDto);
  }

  @Get()
  findAll() {
    return this.userMoviesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMoviesService.remove(+id);
  }
}
