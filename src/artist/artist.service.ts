import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { validate as uuidValidate } from 'uuid';
import { ERR_MSG } from 'src/shared/constants';
import { validate } from 'class-validator';
import { buildValidationErrMsg } from 'src/shared/helpers';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const dto = new CreateArtistDto(createArtistDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      const msg = buildValidationErrMsg(validationErrors);
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }
    const artist = this.databaseService.createArtist(dto);
    return artist;
  }

  async findAll() {
    return await this.databaseService.getAllArtists();
  }

  async findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) return artist;
      throw new HttpException(ERR_MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) {
        const dto = new UpdateArtistDto(updateArtistDto);

        const validationErrors = await validate(dto);

        if (validationErrors.length > 0) {
          const msg = buildValidationErrMsg(validationErrors);
          throw new HttpException(msg, HttpStatus.BAD_REQUEST);
        }
        return await this.databaseService.updateArtist(artist.id, dto);
      }
      throw new HttpException(ERR_MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }

  async remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const artist = await this.databaseService.getArtistById(id);
      if (artist) {
        return await this.databaseService.deleteArtist(id);
      }
      throw new HttpException(ERR_MSG.ARTIST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    throw new HttpException(ERR_MSG.INVALID_ID, HttpStatus.BAD_REQUEST);
  }
}
