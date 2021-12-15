import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LyricService } from './lyric.service';
import { Lyric as LyricModel } from '@prisma/client';

@Controller('lyric')
export class LyricController {
  constructor(private readonly lyricService: LyricService) {}

  @Post()
  async CreateLyric(
    @Body() postData: { content: string, song_id: string }
  ): Promise<LyricModel> {
    const { content, song_id } = postData;

    return this.lyricService.createLyric({
      content,
      song: {
        connect: { id: Number(song_id) }
      }
    });
  }

  @Get()
  async GetAll(@Query('skip') skip?: string, @Query('take') take?: string, @Query('title') content?: string): Promise<Array<LyricModel>> {
    return this.lyricService.lyrics({
      skip: skip && skip.length > 0 && Number(skip) !== NaN ? Number(skip) : undefined,
      take: take && take.length > 0 && Number(take) !== NaN ? Number(take) : undefined,
      where: {
        content: content
      },
    });
  }

  @Get(':id')
  async GetById(@Param('id') id: string): Promise<LyricModel> {
    return this.lyricService.lyric({ id: Number(id) });
  }

  @Put(':id')
  async Update(@Param('id') id: string, @Body() lyric: Omit<Partial<LyricModel>, 'id'>): Promise<LyricModel> {
    return this.lyricService.updateLyric({
      where: { id: Number(id) },
      data: lyric
    });
  }

  @Delete(':id')
  async Delete(@Param('id') id: string): Promise<LyricModel> {
    return this.lyricService.deleteLyric({ id: Number(id)});
  }
}
