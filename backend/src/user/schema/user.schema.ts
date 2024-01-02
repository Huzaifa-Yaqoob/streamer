import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { IsEmail } from 'class-validator';
import { UserMovie } from 'src/user-movies/schema/user-movie.schema';

export type CatDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserMovie',
  })
  userMovies?: UserMovie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
