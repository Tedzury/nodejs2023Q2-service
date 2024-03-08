import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

const mockUsers = [
  new User({ password: '1234', login: 'Oleg' }),
  new User({ password: '1234', login: 'Artem' }),
];

const mockTracks = [
  new Track({ name: 'Ketchup song', duration: 300, artistId: null, albumId: null }),
  new Track({
    name: 'Past lives',
    duration: 200,
    artistId: '179a5ae9-188b-4258-9bc3-c66b85122337',
    albumId: '179a5ae9-188b-4258-9bc3-c66b85122338',
  }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  tracksList: Track[];
  constructor() {
    this.usersList = mockUsers;
    this.tracksList = mockTracks;
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
  }
  deleteUser(id: string) {
    this.usersList = this.usersList.filter((user) => user.id !== id);
  }

  getAllTracks() {
    return this.tracksList;
  }
  getTrackById(id: string) {
    return this.tracksList.find((track) => track.id === id);
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.tracksList.push(track);
    return track;
  }
  updateTrack(track: Track, updateTrackDto: UpdateTrackDto) {
    track.updateTrack(updateTrackDto);
  }
  deleteTrack(id: string) {
    this.tracksList = this.tracksList.filter((track) => track.id !== id);
  }
}
