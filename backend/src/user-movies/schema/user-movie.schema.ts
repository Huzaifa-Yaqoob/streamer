import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<UserMovie>;

@Schema({ timestamps: true })
export class UserMovie {
  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileDisplayName: string;
}

export const UserMovieSchema = SchemaFactory.createForClass(UserMovie);
