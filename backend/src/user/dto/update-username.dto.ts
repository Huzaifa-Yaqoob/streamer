import { PickType } from '@nestjs/mapped-types';
import { RegisterUser } from './register-user.dto';

export class UpdateUsername extends PickType(RegisterUser, [
  'username',
  'id',
] as const) {}
