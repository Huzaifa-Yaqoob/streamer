import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ValidateObjectIdMiddleware } from './middleware/validate-objectid.middleware';
import { Jwt } from './providers/jwt/jwt';

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
    UserModule,
  ],
  providers: [Jwt],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateObjectIdMiddleware)
      .forRoutes({ path: 'user*:id', method: RequestMethod.PATCH });
  }
}
