import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';
import { ERR_MSG } from 'src/shared/constants';
import { validate } from 'class-validator';
import { buildValidationErrMsg } from 'src/shared/helpers';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const dto = new CreateUserDto(createUserDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      const msg = buildValidationErrMsg(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    const newUser = this.databaseService.createUser(dto);
    return newUser;
  }

  findAll() {
    return this.databaseService.getAllUsers();
  }

  findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = this.databaseService.getUserById(id);
      if (user) return user;
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = this.databaseService.getUserById(id);
      if (user) {
        const dto = new UpdateUserDto(updateUserDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          const msg = buildValidationErrMsg(validationErrors);
          throw new HttpException(msg, HttpStatus.BAD_REQUEST);
        }
        if (dto.oldPassword === user.password) {
          this.databaseService.updateUser(user, dto.newPassword);
          return user;
        }
        throw new HttpException(ERR_MSG.WRONG_PASS, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = this.databaseService.getUserById(id);
      if (user) {
        this.databaseService.deleteUser(id);
      }
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
