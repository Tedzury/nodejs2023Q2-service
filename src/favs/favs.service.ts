// import { Injectable } from '@nestjs/common';
// import { DatabaseService } from 'src/database/database.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ERR_MSG } from 'src/shared/constants';
import { validate as uuidValidate } from 'uuid';
import { Fav } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return await this.databaseService.getAllFavouritesFormatted();
  }

  async addArtist(id: string) {
    if (uuidValidate(id)) {
      const artistDoesExist = await this.databaseService.getArtistById(id);
      if (artistDoesExist) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const artistAlreadyInFavs = favs.artists.find((artistId) => artistId === id);
        if (artistAlreadyInFavs) {
          throw new HttpException(ERR_MSG.ARTIST_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          return await this.databaseService.addArtistToFavs(id);
        }
      } else {
        throw new HttpException(
          ERR_MSG.NO_ARTIST_FOR_FAVS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }
  async addAlbum(id: string) {
    if (uuidValidate(id)) {
      const albumDoesExist = await this.databaseService.getAlbumById(id);
      if (albumDoesExist) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const albumAlreadyInFavs = favs.albums.find((albumId) => albumId === id);
        if (albumAlreadyInFavs) {
          throw new HttpException(ERR_MSG.ALBUM_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          await this.databaseService.addAlbumToFavs(id);
        }
      } else {
        throw new HttpException(
          ERR_MSG.NO_ALBUM_FOR_FAVS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }
  async addTrack(id: string) {
    if (uuidValidate(id)) {
      const trackDoesExist = await this.databaseService.getTrackById(id);
      if (trackDoesExist) {
        const favs: Fav = await this.databaseService.getAllFavourites();
        const trackAlreadyInFavs = favs.tracks.find((trackId) => trackId === id);
        if (trackAlreadyInFavs) {
          throw new HttpException(ERR_MSG.TRACK_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          await this.databaseService.addTrackToFavs(id);
        }
      } else {
        throw new HttpException(
          ERR_MSG.NO_TRACK_FOR_FAVS,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }
  async removeArtist(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const artistIsInFavs = favs.artists.find((artistId) => artistId === id);
      if (artistIsInFavs) {
        await this.databaseService.removeArtistFromFavs(id);
        return `Artist with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.ARTIST_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }

  async removeAlbum(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const albumIsInFavs = favs.albums.find((albumId) => albumId === id);
      if (albumIsInFavs) {
        await this.databaseService.removeAlbumFromFavs(id);
        return `Album with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.ALBUM_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }

  async removeTrack(id: string) {
    if (uuidValidate(id)) {
      const favs: Fav = await this.databaseService.getAllFavourites();
      const trackIsInFavs = favs.tracks.find((trackId) => trackId === id);
      if (trackIsInFavs) {
        await this.databaseService.removeTrackFromFavs(id);
        return `Track with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.TRACK_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }
}
