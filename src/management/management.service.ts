import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateManagementDto,UpdateManagementDto } from './dto';
import { PrismaService } from 'src/prisma';
import {  IOptionManagement } from './interface';

@Injectable()
export class ManagementService {

  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createManagementDto: CreateManagementDto) {
    try {
      const findManagement = await this.findManagement({
        where:{
          year: createManagementDto.year
        }
      })
      if(findManagement) throw new NotFoundException(`Management ${findManagement.year} is now available`)

      const createManagement = await this.prisma.management.create({
        data:{
          description: createManagementDto.description,
          year: createManagementDto.year
        }
      })
      return createManagement;
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw err; // Lanza la excepción NotFoundException directamente
      } else {
        throw new InternalServerErrorException(`Server error: ${err}`);
      }
    }
  }

  async findManagement(
    {
      where,
    }: IOptionManagement
  ){
    try {
      const managementFind = await this.prisma.management.findFirst({
        where
      })

      // if(!managementFind) throw new NotFoundException('Management not found')
      
      return managementFind;
    } catch (err) {
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async countManagement(
    {
      where,
    }: IOptionManagement
  ){
    try {
      const managements = await this.prisma.management.count({
        where
      });
      return managements;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`This server error ${JSON.stringify(error)}`)
    }
  }

  async findAll(
    {
    skip,
    take,
    where,
    select,
    orderBy,
    cursor,
    distinct,
    }: IOptionManagement
    ) {
    try {
      const managements = await this.prisma.management.findMany({
        where,
        select,
        skip,
        take,
        orderBy,
        cursor,
        distinct,
      });
      return managements;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`This server error ${JSON.stringify(error)}`)
    }
  }

  async findIdManagement(id: string) {
    try {
      const management = await this.prisma.management.findUnique({
        where:{
          id
        }
      })
      if(!management) throw new NotFoundException(`Not found management with id ${id}`)

      return management;
    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async update(id: string, updateManagementDto: UpdateManagementDto) {
    try {
      //pregunto si existe el id
      const findDescription = await this.findIdManagement(id);

      //ahora si actualizo
      const updateManagent = await this.prisma.management.update({
        where:{
          id
        },
        data:{
          description: updateManagementDto.description ?? findDescription.description,
          year: updateManagementDto.year ?? findDescription.year
        }
      })
      return updateManagent;

    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async remove(id: string) {
    try {
      //pregunto si existe el id
      await this.findIdManagement(id);

      //ahora si actualizo
      const deleteManagement = await this.prisma.management.update({
        where:{
          id
        },
        data:{
          status: false
        }
      })
      return deleteManagement;

    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }
}
