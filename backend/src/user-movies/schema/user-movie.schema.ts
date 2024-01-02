import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<UserMovie>;

@Schema({ timestamps: true })
export class UserMovie {
  @Prop({ required: true })
  movieName: string;

  @Prop({ required: true, minlength: 1, maxlength: 25 })
  movieDisplayName: string;
}

export const UserMovieSchema = SchemaFactory.createForClass(UserMovie);
