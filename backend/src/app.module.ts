import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { Jwt } from './providers/jwt/jwt';
import { $File } from './providers/upload/file-upload';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI + process.env.DB_NAME),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: 'your_secret_key',
        signOptions: { expiresIn: `${60 * 60 * 24 * 3}s` }, //expires in 3 days
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'public'),
      serveRoot: '/uploads/public',
    }),
    UserModule,
  ],
  providers: [Jwt, $File],
})
export class AppModule {}
