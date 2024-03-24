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
    this.initFavs();
  }
  async initFavs() {
    try {
      await this.prismaService.favorites.create({
        data: {
          artists: [],
          albums: [],
          tracks: [],
        },
      });
    } catch (e) {
      return null;
    }
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
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { tracks: favs.tracks.filter((tracksId) => tracksId !== id) },
      });
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
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { artists: favs.artists.filter((artistId) => artistId !== id) },
      });
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
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { albums: favs.albums.filter((albumId) => albumId !== id) },
      });
      return await this.prismaService.album.delete({ where: { id } });
    } catch (e) {
      return null;
    }
  }

  async getAllFavouritesFormatted() {
    try {
      const favs = await this.prismaService.favorites.findUnique({
        where: { id: 'favs' },
      });
      return {
        artists: await Promise.all(
          favs.artists
            .filter((val) => val)
            .map(async (artistId: string) => await this.getArtistById(artistId)),
        ),
        albums: await Promise.all(
          favs.albums
            .filter((val) => val)
            .map(async (albumId: string) => await this.getAlbumById(albumId)),
        ),
        tracks: await Promise.all(
          favs.tracks
            .filter((val) => val)
            .map(async (trackId: string) => await this.getTrackById(trackId)),
        ),
      };
    } catch (e) {
      return null;
    }
  }
  async getAllFavourites() {
    return await this.prismaService.favorites.findUnique({ where: { id: 'favs' } });
  }

  async addArtistToFavs(id: string) {
    try {
      const favs: Fav = await this.getAllFavourites();
      const artistId = id;
      await this.prismaService.favorites.update({
        where: { id: 'favs' },
        data: {
          artists: [...favs.artists, artistId],
        },
      });
      return `Artist with ID: ${id} is added to favourites`;
    } catch (e) {
      return null;
    }
  }
  async addAlbumToFavs(id: string) {
    try {
      const favs = await this.getAllFavourites();
      const albumId = id;
      await this.prismaService.favorites.update({
        where: { id: 'favs' },
        data: { albums: [...favs.albums, albumId] },
      });
      return `Album with ID: ${id} is added to favourites`;
    } catch (e) {
      return null;
    }
  }
  async addTrackToFavs(id: string) {
    try {
      const favs = await this.getAllFavourites();
      const trackId = id;
      await this.prismaService.favorites.update({
        where: { id: 'favs' },
        data: { tracks: [...favs.tracks, trackId] },
      });
      return `Track with ID: ${id} is added to favourites`;
    } catch (e) {
      return null;
    }
  }
  async removeArtistFromFavs(id: string) {
    try {
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { artists: favs.artists.filter((artistId) => artistId !== id) },
      });
    } catch (e) {
      return null;
    }
  }
  async removeAlbumFromFavs(id: string) {
    try {
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { albums: favs.albums.filter((albumId) => albumId !== id) },
      });
    } catch (e) {
      return null;
    }
  }
  async removeTrackFromFavs(id: string) {
    try {
      const favs: Fav = await this.getAllFavourites();
      await this.prismaService.favorites.update({
        where: {
          id: 'favs',
        },
        data: { tracks: favs.tracks.filter((tracksId) => tracksId !== id) },
      });
    } catch (e) {
      return null;
    }
  }
}
