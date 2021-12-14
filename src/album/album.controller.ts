import { Body, Controller, Get, Put, Param, Post, Delete } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album as AlbumModel } from '@prisma/client';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async GetAlbumById(
    @Body() postData: { title: string, release_date?: Date | string, artistId: number }
  ): Promise<AlbumModel> {
    const { title, release_date, artistId } = postData;

    return this.albumService.createAlbum({
      title,
      release_date,

      artists: {
        create: [
          { artist_id: artistId }
        ]
      }
    });
  }

  @Get()
  async GetAll(@Param('skip') skip?: number, @Param('take') take?: number, @Param('name') title?: string): Promise<Array<AlbumModel>> {
    return this.albumService.albums({
      skip: skip,
      take: take,
      where: {
        title: title 
      }
    });
  }

  @Get(':id')
  async GetById(@Param('id') id: string): Promise<AlbumModel> {
    return this.albumService.album({ id: Number(id) });
  }

  @Put(':id')
  async Update(@Param('id') id: string, album: Omit<Partial<AlbumModel>, 'id'>): Promise<AlbumModel> {
    return this.albumService.updateAlbum({
      where: { id: Number(id) },
      data: album
    });
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<AlbumModel> {
    return this.albumService.deleteAlbum({ id: Number(id)});
  }
}