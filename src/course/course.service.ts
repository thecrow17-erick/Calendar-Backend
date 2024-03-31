import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

import { CreateCourseDto ,UpdateCourseDto} from './dto';
import { PrismaService } from 'src/prisma';
import { IOptionCourse } from './interface';

@Injectable()
export class CourseService {
  constructor(
    private readonly prisma:PrismaService
  ){}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const findCourse = await this.findCourse({
        where:{
          name: createCourseDto.name
        }
      })
      if(findCourse) throw new NotFoundException(`grade ${findCourse.name} is now available`)

      const createCourse= await this.prisma.course.create({
        data:{
          name: createCourseDto.name,
          gradeId: createCourseDto.grade_id
        }
      })
      return createCourse;
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        throw err; // Lanza la excepción NotFoundException directamente
      } else {
        throw new InternalServerErrorException(`Server error: ${err}`);
      }
    }
  }

  async findCourse(
    {
      where,
    }: IOptionCourse
  ){
    try {
      const courseFind = await this.prisma.course.findFirst({
        where
      })

      // if(!managementFind) throw new NotFoundException('Management not found')
      
      return courseFind;
    } catch (err) {
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }

  async countCourse(
    {
      where,
    }: IOptionCourse
  ){
    try {
      const courses = await this.prisma.course.count({
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
    }: IOptionCourse
    ) {
    try {
      const courses = await this.prisma.course.findMany({
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

  async findIdCourse(id: string) {
    try {
      const course = await this.prisma.course.findUnique({
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

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      //pregunto si existe el id
      const findCourseId = await this.findIdCourse(id);

      //pregunto si nombre es igual a otro en la tabla
      const findGrade = await this.findCourse({
        where:{
          name: updateCourseDto.name
        }
      })
      if(findGrade) throw new NotFoundException(`grade ${findGrade.name} is now available`)

      //ahora si actualizo
      const updateManagent = await this.prisma.course.update({
        where:{
          id
        },
        data:{
          name: updateCourseDto.name ?? findCourseId.name,
          gradeId: updateCourseDto.grade_id ?? findCourseId.gradeId,

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
      await this.findIdCourse(id);

      //ahora si actualizo
      const deleteCourse = await this.prisma.course.update({
        where:{
          id
        },
        data:{
          status: false
        }
      })
      return deleteCourse;

    } catch (err) {
      if(err instanceof NotFoundException){
        throw err
      }
      throw new InternalServerErrorException(`This server error ${JSON.stringify(err)}`)
    }
  }
}
