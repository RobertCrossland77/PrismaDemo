import { Body, Controller, Get, Put, Param, Post, Delete, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album as AlbumModel } from '@prisma/client';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async CreateAlbum(
    @Body() postData: { title: string, release_date?: Date | string, artist_name: string }
  ): Promise<AlbumModel> {
    const { title, release_date, artist_name } = postData;

    return this.albumService.createAlbum({
      title,
      release_date,
      artists: {
        connect: [
          {name: artist_name}
        ]
      }
    });
  }

  @Get()
  async GetAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('title') title?: string): Promise<Array<AlbumModel>> {
    return this.albumService.albums({
      skip: skip && skip.length > 0 && Number(skip) !== NaN ? Number(skip) : undefined,
      take: take && take.length > 0 && Number(take) !== NaN ? Number(take) : undefined,
      where: {
        title: { contains: title }
      },
    });
  }

  @Get(':id')
  async GetById(@Param('id') id: string): Promise<AlbumModel> {
    return this.albumService.album({ id: Number(id) });
  }

  @Put(':id')
  async Update(@Param('id') id: string, @Body() album: Omit<Partial<AlbumModel>, 'id'>): Promise<AlbumModel> {
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