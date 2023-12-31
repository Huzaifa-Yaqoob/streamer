import { Module } from '@nestjs/common';
import { UserMoviesService } from './user-movies.service';
import { UserMoviesController } from './user-movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { UserMovie, UserMovieSchema } from './schema/user-movie.schema';
import { Jwt } from 'src/providers/jwt/jwt';
import { $File } from 'src/providers/upload/file-upload';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: UserMovie.name,
        useFactory: () => {
          const schema = UserMovieSchema;
          return schema;
        },
      },
    ]),
    UserModule,
  ],
  controllers: [UserMoviesController],
  providers: [UserMoviesService, Jwt, $File],
})
export class UserMoviesModule {}
