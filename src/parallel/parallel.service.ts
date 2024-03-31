import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateParallelDto } from './dto/create-parallel.dto';
import { UpdateParallelDto } from './dto/update-parallel.dto';
import { PrismaService } from 'src/prisma';
import { IOptionParallel } from './interface';

@Injectable()
export class ParallelService {
  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createParallelDto: CreateParallelDto) {
    try {
      //pregunto si nombre es igual a otro en la tabla
      const findParallel = await this.findParallel({
        where:{
          AND:[
            {
              courseId: createParallelDto.course_id
            },
            {
              name: createParallelDto.name
            }
          ]
        }
      })
      if(findParallel) throw new NotFoundException(`grade ${findParallel.name} is now available`)
      //ahora si creo el curso paralelo
      const createParallel= await this.prisma.parallel.create({
        data:{
          name: createParallelDto.name,
          courseId: createParallelDto.course_id
        }
      })
      return createParallel;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Server error: ${err}`);
    }
  }

  async findParallel(
    {
      where,
    }: IOptionParallel
  ){
    try {
      const parallelFind = await this.prisma.parallel.findFirst({
        where
      })

      // if(!managementFind) throw new NotFoundException('Management not found')
      
      return parallelFind;
    } catch (err) {
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async countParallel(
    {
      where,
    }: IOptionParallel
  ){
    try {
      const courses = await this.prisma.parallel.count({
        where
      });
      return courses;
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
    }: IOptionParallel
    ) {
    try {
      const courses = await this.prisma.parallel.findMany({
        where,
        select,
        skip,
        take,
        orderBy,
        cursor,
        distinct,
      });
      return courses;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(`This server error ${JSON.stringify(error)}`)
    }
  }

  async findIdParallel(id: string) {
    try {
      const course = await this.prisma.parallel.findUnique({
        where:{
          id
        }
      })
      if(!course) throw new NotFoundException(`Not found management with id ${id}`)
      return course;
    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async update(id: string, updateParallelDto: UpdateParallelDto) {
    try {
      //pregunto si existe el id
      const findParallelId = await this.findIdParallel(id);

      //pregunto si nombre es igual a otro en la tabla
      const findParallel = await this.findParallel({
        where:{
          AND:[
            {
              courseId: updateParallelDto.course_id
            },
            {
              name: updateParallelDto.name
            }
          ]
        }
      })
      if(findParallel) throw new NotFoundException(`grade ${findParallel.name} is now available`)

      //ahora si actualizo
      const updateParallel = await this.prisma.parallel.update({
        where:{
          id
        },
        data:{
          name: updateParallelDto.name ?? findParallelId.name,
          courseId: updateParallelDto.course_id ?? findParallelId.courseId,
        }
      })
      return updateParallel;

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
      await this.findIdParallel(id);

      //ahora si actualizo
      const deleteParallel = await this.prisma.parallel.update({
        where:{
          id
        },
        data:{
          status: false
        }
      })
      return deleteParallel;

    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }
}
