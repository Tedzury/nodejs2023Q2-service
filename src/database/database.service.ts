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
import { Fav } from 'src/favs/entities/fav.entity';
import { PrismaClientService } from 'src/prismaClient/prismaClient.service';
import { formatUser } from 'src/shared/helpers';

@Injectable()
export class DatabaseService {
  usersList: User[];
  tracksList: Track[];
  artistsList: Artist[];
  albumsList: Album[];
  favouritesList: Fav;
  constructor(private readonly prismaService: PrismaClientService) {
    this.usersList = [];
    this.tracksList = [];
    this.artistsList = [];
    this.albumsList = [];
    this.favouritesList = new Fav();
  }
  async getAllUsers() {
    return this.prismaService.user.findMany();
  }
  async getUserById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }
  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: createUserDto,
    });
    return formatUser(newUser);
  }
  async updateUser(id: string, newPass: string) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: {
          password: newPass,
          version: { increment: 1 },
        },
      });
      return formatUser(user);
    } catch (e) {
      return null;
    }
  }
  async deleteUser(id: string) {
    try {
      return await this.prismaService.user.delete({ where: { id } });
    } catch (e) {
      return null;
    }
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
    this.favouritesList.removeTrack(id);
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
    this.removeArtistIdFromTracks(id);
    this.removeArtistIdFromAlbums(id);
    this.favouritesList.removeArtist(id);
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
    this.removeAlbumIdFromTracks(id);
    this.favouritesList.removeAlbum(id);
  }

  getAllFavourites() {
    const favs = this.favouritesList.getAllFavourites();
    return {
      artists: favs.artists.map((artistId) => this.getArtistById(artistId)),
      albums: favs.albums.map((albumId) => this.getAlbumById(albumId)),
      tracks: favs.tracks.map((trackId) => this.getTrackById(trackId)),
    };
  }

  removeAlbumIdFromTracks(albumId: string) {
    this.tracksList.forEach((track) => {
      if (track.albumId === albumId) track.albumId = null;
    });
  }
  removeArtistIdFromTracks(artistId: string) {
    this.tracksList.forEach((track) => {
      if (track.artistId === artistId) track.artistId = null;
    });
  }
  removeArtistIdFromAlbums(artistId: string) {
    this.albumsList.forEach((album) => {
      if (album.artistId === artistId) album.artistId = null;
    });
  }
}
