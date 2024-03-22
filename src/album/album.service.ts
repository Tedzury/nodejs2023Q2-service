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
      const artist = await this.databaseService.getArtistById(artistId);
      if (!artist) {
        throw new HttpException(ERR_MSG.ARTIST_REJECT, HttpStatus.BAD_REQUEST);
      }
    }

    return await this.databaseService.createAlbum(dto);
  }

  async findAll() {
    return await this.databaseService.getAllAlbums();
  }

  async findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) return album;
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) {
        const dto = new UpdateAlbumDto(updateAlbumDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          const msg = buildValidationErrMsg(validationErrors);
          throw new HttpException(msg, HttpStatus.BAD_REQUEST);
        }

        const { artistId } = dto;
        if (artistId) {
          const artist = await this.databaseService.getArtistById(artistId);
          if (!artist) {
            throw new HttpException(ERR_MSG.ARTIST_REJECT, HttpStatus.BAD_REQUEST);
          }
        }

        return this.databaseService.updateAlbum(album.id, dto);
      }
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const album = await this.databaseService.getAlbumById(id);
      if (album) {
        return await this.databaseService.deleteAlbum(id);
      }
      throw new HttpException(ERR_MSG.ALBUM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
