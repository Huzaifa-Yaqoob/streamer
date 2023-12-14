import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Request } from 'express';
import { Jwt } from 'src/providers/jwt/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: Jwt) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const authorization = request.headers.authorization;
    if (!authorization) {
      return false;
    }
    const token = authorization.split(' ')[1];
    const payLoad = await this.jwt.validateToken(token);
    if (!payLoad) {
      return false;
    }

    const id = payLoad.userID;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }

    request.body = {
      ...request.body,
      id,
    };
    return true;
  }
}
