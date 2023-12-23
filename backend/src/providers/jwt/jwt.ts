import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayLoad } from 'src/types';

@Injectable()
export class Jwt {
  constructor(private readonly jwtService: JwtService) {}

  async assignToken(payLoad: PayLoad): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payLoad);
      return `Bearer ${token}`;
    } catch (error) {
      console.log(error, 'error at assigning token');
      throw new Error();
    }
  }

  async validateToken(token: string): Promise<PayLoad> {
    try {
      return await this.jwtService.decode(token);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
