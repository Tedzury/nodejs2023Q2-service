import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

const mockUsers = [
  new User({ password: '1234', login: 'Oleg' }),
  new User({ password: '1234', login: 'Artem' }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  constructor() {
    this.usersList = mockUsers;
  }
  getAllUsers() {
    return this.usersList;
  }
  getUserById(id: string) {
    return this.usersList.find((user) => user.id === id);
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    this.usersList.push(newUser);
    return newUser;
  }
  updateUser(user: User, newPass: string) {
    user.updatePassword(newPass);
    return user;
  }
  deleteUser(id: string) {
    this.usersList = this.usersList.filter((user) => user.id !== id);
  }
}
