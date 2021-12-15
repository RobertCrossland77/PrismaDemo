import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Artist, Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
    
  createArtist = async(data: Prisma.ArtistCreateInput): Promise<Artist> =>
    this.prisma.artist.create({ data });
    
  artist = async(artistWhereUniqueInput: Prisma.ArtistWhereUniqueInput): Promise<Artist | null> => 
    this.prisma.artist.findUnique({
      where: artistWhereUniqueInput
    });

  artists = async(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ArtistWhereUniqueInput;
    where?: Prisma.ArtistWhereInput;
    orderBy?: Prisma.ArtistOrderByWithRelationInput;
  }): Promise<Array<Artist>> => {
    const { skip, take, cursor, where, orderBy } = params;
    
    return this.prisma.artist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        albums: {
          include: {
            songs: {
              include: {
                lyrics: true
              }
            }
          }
        }
      }
    });
  }

  async updateArtist(params: {
    where: Prisma.ArtistWhereUniqueInput;
    data: Prisma.ArtistUpdateInput;
  }): Promise<Artist> {
    const { where, data } = params;

    return this.prisma.artist.update({
      data,
      where,
    });
  }
  
  deleteArtist = async(where: Prisma.AlbumWhereUniqueInput): Promise<Artist> =>
    this.prisma.artist.delete({
      where
    });
}
