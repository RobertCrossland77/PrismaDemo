import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Album, Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
    constructor(private prisma: PrismaService) {}
    
    createAlbum = async(data: Prisma.AlbumCreateInput): Promise<Album> =>
      this.prisma.album.create({ data });
    
    album = async(albumWhereUniqueInput: Prisma.AlbumWhereUniqueInput): Promise<Album | null> => 
      this.prisma.album.findUnique({
        where: albumWhereUniqueInput
      });

    albums = async(params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.AlbumWhereUniqueInput;
      where?: Prisma.AlbumWhereInput;
      orderBy?: Prisma.AlbumOrderByWithRelationInput;
    }): Promise<Album[]> => {
      const { skip, take, cursor, where, orderBy } = params;

      return this.prisma.album.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    }

    async updateAlbum(params: {
      where: Prisma.AlbumWhereUniqueInput;
      data: Prisma.AlbumUpdateInput;
    }): Promise<Album> {
      const { where, data } = params;

      return this.prisma.album.update({
        data,
        where,
      });
    }
  
    //async deleteUser(where: Prisma.AlbumWhereUniqueInput): Promise<Album> {
    //  return this.prisma.album.delete({});
    //}
}