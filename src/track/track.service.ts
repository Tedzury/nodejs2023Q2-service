import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';
import { ERR_MSG } from 'src/shared/constants';
import { validate } from 'class-validator';
import { buildValidationErrMsg } from 'src/shared/helpers';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const dto = new CreateTrackDto(createTrackDto);

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

    const { albumId } = dto;
    if (albumId) {
      const album = await this.databaseService.getAlbumById(albumId);
      if (!album) {
        throw new HttpException(ERR_MSG.ALBUM_REJECT, HttpStatus.BAD_REQUEST);
      }
    }

    return await this.databaseService.createTrack(dto);
  }

  async findAll() {
    return await this.databaseService.getAllTracks();
  }

  async findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = await this.databaseService.getTrackById(id);
      if (track) return track;
      throw new HttpException(ERR_MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = await this.databaseService.getTrackById(id);
      if (track) {
        const dto = new UpdateTrackDto(updateTrackDto);

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

        const { albumId } = dto;
        if (albumId) {
          const album = await this.databaseService.getAlbumById(albumId);
          if (!album) {
            throw new HttpException(ERR_MSG.ALBUM_REJECT, HttpStatus.BAD_REQUEST);
          }
        }

        return await this.databaseService.updateTrack(track.id, dto);
      }
      throw new HttpException(ERR_MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const track = await this.databaseService.getTrackById(id);
      if (track) {
        return await this.databaseService.deleteTrack(id);
      }
      throw new HttpException(ERR_MSG.TRACK_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
