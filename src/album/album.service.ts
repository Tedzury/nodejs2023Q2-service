import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';
import { ERR_MSG } from 'src/shared/constants';
import { validate } from 'class-validator';
import { buildValidationErrMsg } from 'src/shared/helpers';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const dto = new CreateAlbumDto(createAlbumDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      const msg = buildValidationErrMsg(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }

    const { artistId } = dto;
    if (artistId) {
      const artist = this.databaseService.getArtistById(artistId);
      if (!artist) {
        throw new HttpException(ERR_MSG.ARTIST_REJECT, HttpStatus.BAD_REQUEST);
      }
    }

    const album = this.databaseService.createAlbum(dto);
    return album;
  }

  findAll() {
    return this.databaseService.getAllAlbums();
  }

  findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = this.databaseService.getAlbumById(id);
      if (album) return album;
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = this.databaseService.getAlbumById(id);
      if (album) {
        const dto = new UpdateAlbumDto(updateAlbumDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          const msg = buildValidationErrMsg(validationErrors);
          throw new HttpException(msg, HttpStatus.BAD_REQUEST);
        }

        const { artistId } = dto;
        if (artistId) {
          const artist = this.databaseService.getArtistById(artistId);
          if (!artist) {
            throw new HttpException(ERR_MSG.ARTIST_REJECT, HttpStatus.BAD_REQUEST);
          }
        }

        album.updateAlbum(dto);
        return album;
      }
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = this.databaseService.getAlbumById(id);
      if (album) {
        this.databaseService.deleteAlbum(id);
        return;
      }
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
