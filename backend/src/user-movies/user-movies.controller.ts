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
import { MovieFilePipePipe } from 'src/pipes/movie-file-pipe/movie-file-pipe.pipe';

@UseGuards(AuthGuard)
@Controller('user-movies')
export class UserMoviesController {
  constructor(private readonly userMoviesService: UserMoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('movie'))
  @UsePipes(new ValidationPipe())
  async create(
    @Query('id') id: string,
    @UploadedFile(new MovieFilePipePipe()) file: Express.Multer.File,
    @Body() body: CreateUserMovieDto,
  ) {
    try {
      return await this.userMoviesService.upload(id, body.movieName, file);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(@Query('id') id: string) {
    try {
      return await this.userMoviesService.findAll(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMoviesService.remove(+id);
  }
}
