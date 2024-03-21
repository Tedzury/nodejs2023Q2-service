import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { DatabaseModule } from './database/database.module';
import { FavsModule } from './favs/favs.module';
import { prismaTestModule } from './prismaTest/prismaTest.module';

@Module({
  imports: [
    prismaTestModule,
    FavsModule,
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
