import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favsService.addArtist(id);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favsService.addAlbum(id);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    return this.favsService.addTrack(id);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(id);
  }
}
