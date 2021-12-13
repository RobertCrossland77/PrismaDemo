import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist as ArtistModel } from '@prisma/client';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post()
    async GetAlbumById(
      @Body() postData: { name: string }
    ): Promise<ArtistModel> {
      const { name } = postData;
  
      return this.artistService.createArtist({ name });
    }
  
    @Get()
    async GetAll(): Promise<Array<ArtistModel>> {
      return this.artistService.artists({});
    }
  
    @Get(':id')
    async GetById(@Param('id') id: string): Promise<ArtistModel> {
      return this.artistService.artist({ id: Number(id) });
    }
  
    @Put(':id')
    async Update(@Param('id') id: string, album: Omit<Partial<ArtistModel>, 'id'>): Promise<ArtistModel> {
      return this.artistService.updateArtist({
        where: { id: Number(id) },
        data: album
      });
    }
  
    @Delete(':id')
    async Delete(@Param('id') id: string): Promise<ArtistModel> {
      return this.artistService.deleteArtist({ id: Number(id)});
    }
}
