import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ERR_MSG } from 'src/shared/constants';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.favouritesList.getAllFavourites();
  }

  addArtist(id: string) {
    if (uuidValidate(id)) {
      const artistDoesExist = this.databaseService.getArtistById(id);
      if (artistDoesExist) {
        const artistAlreadyInFavs = this.databaseService.favouritesList.getArtistById(id);
        if (artistAlreadyInFavs) {
          throw new HttpException(ERR_MSG.ARTIST_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          this.databaseService.favouritesList.addArtist(id);
          return `Artist with ID: ${id} is added to favourites`;
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
  removeArtist(id: string) {
    if (uuidValidate(id)) {
      const artistIsInFavs = this.databaseService.favouritesList.getArtistById(id);
      if (artistIsInFavs) {
        this.databaseService.favouritesList.removeArtist(id);
        return `Artist with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.ARTIST_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }

  addAlbum(id: string) {
    if (uuidValidate(id)) {
      const albumDoesExist = this.databaseService.getAlbumById(id);
      if (albumDoesExist) {
        const albumAlreadyInFavs = this.databaseService.favouritesList.getAlbumById(id);
        if (albumAlreadyInFavs) {
          throw new HttpException(ERR_MSG.ALBUM_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          this.databaseService.favouritesList.addAlbum(id);
          return `Album with ID: ${id} is added to favourites`;
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
  removeAlbum(id: string) {
    if (uuidValidate(id)) {
      const albumIsInFavs = this.databaseService.favouritesList.getAlbumById(id);
      if (albumIsInFavs) {
        this.databaseService.favouritesList.removeAlbum(id);
        return `Album with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.ALBUM_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }

  addTrack(id: string) {
    if (uuidValidate(id)) {
      const trackDoesExist = this.databaseService.getTrackById(id);
      if (trackDoesExist) {
        const trackAlreadyInFavs = this.databaseService.favouritesList.getTrackById(id);
        if (trackAlreadyInFavs) {
          throw new HttpException(ERR_MSG.TRACK_ALREADY_IN_FAVS, HttpStatus.CONFLICT);
        } else {
          this.databaseService.favouritesList.addTrack(id);
          return `Track with ID: ${id} is added to favourites`;
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
  removeTrack(id: string) {
    if (uuidValidate(id)) {
      const trackIsInFavs = this.databaseService.favouritesList.getTrackById(id);
      if (trackIsInFavs) {
        this.databaseService.favouritesList.removeTrack(id);
        return `Track with ID: ${id} is removed from favourites`;
      } else {
        throw new HttpException(ERR_MSG.TRACK_IN_FAVS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
    }
  }
}
