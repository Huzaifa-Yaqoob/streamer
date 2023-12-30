import { Module } from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { UserMoviesController } from './user-movies.controller';
import { Jwt } from 'src/providers/jwt/jwt';
import { $File } from 'src/providers/upload/file-upload';

@Module({
  controllers: [UserMoviesController],
  providers: [UserMoviesService, Jwt, $File],
})
export class UserMoviesModule {}
