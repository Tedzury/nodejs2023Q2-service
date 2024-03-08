import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class Track {
  readonly id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;
  constructor(dto: CreateTrackDto) {
    this.id = uuid();
    this.name = dto.name;
    this.duration = dto.duration;
    this.artistId = dto.artistId;
    this.albumId = dto.albumId;
  }
  updateTrack(updateTrackDto: UpdateTrackDto) {
    for (const prop in updateTrackDto) {
      if (updateTrackDto[prop]) {
        this[prop] = updateTrackDto[prop];
      }
    }
    return this;
  }
}
