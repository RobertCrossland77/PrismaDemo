import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Song, Prisma } from '@prisma/client';

@Injectable()
export class SongService {
  constructor(private prisma: PrismaService) {}
    
  createSong = async(data: Prisma.SongCreateInput): Promise<Song> =>
    this.prisma.song.create({ data });
    
  song = async(songWhereUniqueInput: Prisma.SongWhereUniqueInput): Promise<Song | null> => 
    this.prisma.song.findUnique({
      where: songWhereUniqueInput
    });

  songs = async(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArtistWhereUniqueInput;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput;
  }): Promise<Array<Song>> => {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.song.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async updateSong(params: {
    where: Prisma.SongWhereUniqueInput;
    data: Prisma.SongUpdateInput;
  }): Promise<Song> {
    const { where, data } = params;

    return this.prisma.song.update({
      data,
      where,
    });
  }
  
  deleteSong = async(where: Prisma.SongWhereUniqueInput): Promise<Song> =>
    this.prisma.song.delete({
      where
    });    
}
