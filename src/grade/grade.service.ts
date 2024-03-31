import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma';
import { IOptionGrade } from './interface';
import { CreateGradeDto,UpdateGradeDto } from './dto';

@Injectable()
export class GradeService {
  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createGradeDto: CreateGradeDto) {
    try {
      const findGrade = await this.findGrade({
        where:{
          name: createGradeDto.name
        }
      })
      if(findGrade) throw new NotFoundException(`grade ${findGrade.name} is now available`)

      const createGrade = await this.prisma.grade.create({
        data:{
          desc: createGradeDto.desc,
          name: createGradeDto.name
        }
      })
      return createGrade;
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw err; // Lanza la excepción NotFoundException directamente
      } else {
        throw new InternalServerErrorException(`Server error: ${err}`);
      }
    }
  }

  async findGrade(
    {
      where,
    }: IOptionGrade
  ){
    try {
      const gradeFind = await this.prisma.grade.findFirst({
        where
      })

      // if(!managementFind) throw new NotFoundException('Management not found')
      
      return gradeFind;
    } catch (err) {
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async countGrade(
    {
      where,
    }: IOptionGrade
  ){
    try {
      const managements = await this.prisma.grade.count({
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
    }: IOptionGrade
    ) {
    try {
      const grades = await this.prisma.grade.findMany({
        where,
        select,
        skip,
        take,
        orderBy,
        cursor,
        distinct,
      });
      return grades;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`This server error ${JSON.stringify(error)}`)
    }
  }

  async findIdGrade(id: string) {
    try {
      const grade = await this.prisma.grade.findUnique({
        where:{
          id
        }
      })
      if(!grade) throw new NotFoundException(`Not found management with id ${id}`)

      return grade;
    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async update(id: string, updateGradeDto: UpdateGradeDto) {
    try {
      //pregunto si existe el id
      const findGradeId = await this.findIdGrade(id);

      //pregunto si nombre es igual a otro en la tabla
      const findGrade = await this.findGrade({
        where:{
          name: updateGradeDto.name
        }
      })
      if(findGrade) throw new NotFoundException(`grade ${findGrade.name} is now available`)

      //ahora si actualizo
      const updateManagent = await this.prisma.grade.update({
        where:{
          id
        },
        data:{
          desc: updateGradeDto.desc ?? findGradeId.desc,
          name: updateGradeDto.name ?? findGradeId.name
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
      await this.findIdGrade(id);

      //ahora si actualizo
      const deleteGrade = await this.prisma.grade.update({
        where:{
          id
        },
        data:{
          status: false
        }
      })
      return deleteGrade;

    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }
}
