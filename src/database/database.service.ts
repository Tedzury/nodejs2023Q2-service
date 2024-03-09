import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Track } from 'src/track/entities/track.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';

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

const mockArtits = [
  new Artist({ name: 'Miley Cirus', grammy: true }),
  new Artist({ name: 'DayteTank', grammy: false }),
];

const mockAlbums = [
  new Album({ name: 'Jhal net rhujiya', year: 2002, artistId: 'oooaaa' }),
  new Album({ name: 'Motorhead', year: 1977, artistId: 'aaaooo' }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  tracksList: Track[];
  artistsList: Artist[];
  albumsList: Album[];
  constructor() {
    this.usersList = mockUsers;
    this.tracksList = mockTracks;
    this.artistsList = mockArtits;
    this.albumsList = mockAlbums;
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

  getAllArtists() {
    return this.artistsList;
  }
  getArtistById(id: string) {
    return this.artistsList.find((artist) => artist.id === id);
  }
  createArtist(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.artistsList.push(artist);
    return artist;
  }
  updateArtist(artist: Artist, updateArtistDto: UpdateArtistDto) {
    artist.updateArtist(updateArtistDto);
  }
  deleteArtist(id: string) {
    this.artistsList = this.artistsList.filter((artist) => artist.id !== id);
  }

  getAllAlbums() {
    return this.albumsList;
  }
  getAlbumById(id: string) {
    return this.albumsList.find((album) => album.id === id);
  }
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.albumsList.push(album);
    return album;
  }
  updateAlbum(album: Album, updateAlbumDto: UpdateAlbumDto) {
    album.updateAlbum(updateAlbumDto);
  }
  deleteAlbum(id: string) {
    this.albumsList = this.albumsList.filter((album) => album.id !== id);
  }
}
