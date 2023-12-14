import { OmitType } from '@nestjs/mapped-types';
import { RegisterUser } from './register-user.dto';

export class LoginUser extends OmitType(RegisterUser, ['username'] as const) {}
