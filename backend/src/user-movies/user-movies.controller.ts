import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Query,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { CreateUserMovieDto } from './dto/create-user-movie.dto';
import { UpdateUserMovieDto } from './dto/update-user-movie.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieOwnerGuard } from '../guards/movie-owner/movie-owner.guard';
import { MovieFilePipePipe } from 'src/pipes/movie-file-pipe/movie-file-pipe.pipe';

@UseGuards(AuthGuard)
@Controller('user-movies')
export class UserMoviesController {
  constructor(private readonly userMoviesService: UserMoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('movie'))
  @UsePipes(new ValidationPipe())
  create(
    @Query('id') id: string,
    @UploadedFile(new MovieFilePipePipe()) file: Express.Multer.File,
    @Body() body: CreateUserMovieDto,
  ) {
    try {
      return this.userMoviesService.upload(id, body.movieName, file);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAll(@Query('id') id: string) {
    try {
      return this.userMoviesService.findAll(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // i will implement this feature latter
  // @Get(':id')
  // @UseGuards(MovieOwnerGuard)
  // findOne(@Param('id') id: string, @Query('id') userId: string) {
  //   try {
  //     console.log(id);
  //     return this.userMoviesService.findOne(id);
  //   } catch (error) {
  //     console.log(error);
  //     throw new InternalServerErrorException();
  //   }
  // }

  @Patch(':id')
  @UseGuards(MovieOwnerGuard)
  @UsePipes(new ValidationPipe())
  rename(@Param('id') id: string, @Body() body: UpdateUserMovieDto) {
    try {
      return this.userMoviesService.rename(id, body);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @UseGuards(MovieOwnerGuard)
  remove(@Param('id') id: string, @Query('id') userId: string) {
    try {
      return this.userMoviesService.remove(id, userId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
