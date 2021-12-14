import { Module } from '@nestjs/common';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { SongController } from './song/song.controller';
import { SongService } from './song/song.service';
import { LyricController } from './lyric/lyric.controller';
import { LyricService } from './lyric/lyric.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [ArtistController, AlbumController, SongController, LyricController],
  providers: [PrismaService, ArtistService, AlbumService, SongService, LyricService],
})
export class AppModule {}
