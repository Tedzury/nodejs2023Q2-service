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
    const newUser = await this.databaseService.createUser(dto);
    return newUser;
  }

  async findAll() {
    return await this.databaseService.getAllUsers();
  }

  async findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = await this.databaseService.getUserById(id);
      if (user) return user;
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const dto = new UpdateUserDto(updateUserDto);

      const validationErrors = await validate(dto);

      if (validationErrors.length > 0) {
        const msg = buildValidationErrMsg(validationErrors);
        throw new HttpException(msg, HttpStatus.BAD_REQUEST);
      }

      const user = await this.databaseService.getUserById(id);
      if (user) {
        if (dto.oldPassword === user.password) {
          const res = await this.databaseService.updateUser(user.id, dto.newPassword);
          return res;
        }
        throw new HttpException(ERR_MSG.WRONG_PASS, HttpStatus.FORBIDDEN);
      }
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = await this.databaseService.getUserById(id);
      if (user) {
        await this.databaseService.deleteUser(id);
        return;
      }
      throw new HttpException(ERR_MSG.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
