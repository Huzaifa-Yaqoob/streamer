import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { hashingPassword } from 'src/lib/password-hashed';
import { Jwt } from 'src/providers/jwt/jwt';
import { $File } from 'src/providers/file/file-func';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // hash password before saving new documents
          schema.pre('save', hashingPassword);
          return schema;
        },
      },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [UserController],
  providers: [UserService, Jwt, $File],
})
export class UserModule {}
