import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Lyric, Prisma } from '@prisma/client';

@Injectable()
export class LyricService {
    constructor(private prisma: PrismaService) {}
  
    createLyric = async(data: Prisma.LyricCreateInput): Promise<Lyric> =>
      this.prisma.lyric.create({
        data
      });
  
  
    lyric = async(lyricWhereUniqueInput: Prisma.LyricWhereUniqueInput): Promise<Lyric | null> => 
      this.prisma.lyric.findUnique({
        where: lyricWhereUniqueInput
      });
  
    lyrics = async(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.LyricWhereUniqueInput;
      where?: Prisma.LyricWhereInput;
      orderBy?: Prisma.LyricOrderByWithRelationInput;
    }): Promise<Array<Lyric>> => {
      const { skip, take, cursor, where, orderBy } = params;
  
      return this.prisma.lyric.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }
  
    async updateLyric(params: {
      where: Prisma.LyricWhereUniqueInput;
      data: Prisma.LyricUpdateInput;
    }): Promise<Lyric> {
      const { where, data } = params;
  
      return this.prisma.lyric.update({
        data,
        where,
      });
    }
  
    async deleteLyric(where: Prisma.LyricWhereUniqueInput): Promise<Lyric> {
      return this.prisma.lyric.delete({
        where
      });
    }
}
