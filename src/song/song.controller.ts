import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SongService } from './song.service';
import { Song as SongModel } from '@prisma/client';

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post()
  async CreateSong(
    @Body() postData: { name: string, lyrics?: string, albumId: string }
  ): Promise<SongModel> {
    const { name, albumId, lyrics } = postData;
  
    return this.songService.createSong({ 
      name,
      album: {
        connect: { id: Number(albumId) }
      },
      lyrics: {
        create: {
          content: lyrics
        }
      }
    });
  }
  
  @Get()
  async GetAll(): Promise<Array<SongModel>> {
    return this.songService.songs({});
  }
  
  @Get(':id')
  async GetById(@Param('id') id: string): Promise<SongModel> {
    return this.songService.song({ id: Number(id) });
  }
  
  @Put(':id')
  async Update(@Param('id') id: string, album: Omit<Partial<SongModel>, 'id'>): Promise<SongModel> {
    return this.songService.updateSong({
      where: { id: Number(id) },
      data: album
    });
  }
  
  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<SongModel> {
    return this.songService.deleteSong({ id: Number(id)});
  }
}