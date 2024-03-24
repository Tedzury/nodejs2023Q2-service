import { v4 as uuid } from 'uuid';
import { getTimeStamp } from 'src/shared/helpers';
import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  readonly id: string;
  readonly createdAt: number;
  readonly login: string;
  password: string;
  version: number;
  updatedAt: number;
  constructor({ password, login }: CreateUserDto) {
    this.id = uuid();
    this.createdAt = getTimeStamp();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.updatedAt = this.createdAt;
  }
  updatePassword(newPass: string) {
    this.password = newPass;
    this.version = this.version += 1;
    this.updatedAt = getTimeStamp();
  }
}
