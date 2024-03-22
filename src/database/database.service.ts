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

  async getAllTracks() {
    return await this.prismaService.track.findMany();
  }
  async getTrackById(id: string) {
    return await this.prismaService.track.findUnique({ where: { id } });
  }
  async createTrack(createTrackDto: CreateTrackDto) {
    return await this.prismaService.track.create({ data: createTrackDto });
  }
  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prismaService.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (e) {
      return null;
    }
  }
  async deleteTrack(id: string) {
    try {
      return await this.prismaService.track.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async getAllArtists() {
    return await this.prismaService.artist.findMany();
  }
  async getArtistById(id: string) {
    return await this.prismaService.artist.findUnique({ where: { id } });
  }
  async createArtist(createArtistDto: CreateArtistDto) {
    return await this.prismaService.artist.create({ data: createArtistDto });
  }
  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prismaService.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (e) {
      return null;
    }
  }
  async deleteArtist(id: string) {
    try {
      return await this.prismaService.artist.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async getAllAlbums() {
    return await this.prismaService.album.findMany();
  }
  async getAlbumById(id: string) {
    return await this.prismaService.album.findUnique({ where: { id } });
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.prismaService.album.create({ data: createAlbumDto });
  }
  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prismaService.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch (e) {
      return null;
    }
  }
  async deleteAlbum(id: string) {
    try {
      return await this.prismaService.album.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  getAllFavourites() {
    const favs = this.favouritesList.getAllFavourites();
    return {
      artists: favs.artists.map((artistId) => this.getArtistById(artistId)),
      albums: favs.albums.map((albumId) => this.getAlbumById(albumId)),
      tracks: favs.tracks.map((trackId) => this.getTrackById(trackId)),
    };
  }
}
