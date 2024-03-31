import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, InternalServerErrorException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Response } from 'express';
import { queryPagesDto } from 'src/common/dto';
import { ParsePostgresIdPipe } from 'src/common/pipes/parse-postgres-id';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto,@Res() res: Response) {
    const statusCode = HttpStatus.CREATED;
    return res.status(statusCode).json({
      message: "Course created sucessfull",
      statusCode,
      grade: await this.courseService.create(createCourseDto) 
    })
  }

  @Get()
  async findAll(@Query() query: queryPagesDto,@Res() res: Response) {
    const statusCode = HttpStatus.OK
    try {
      const [total, courses] = await Promise.all([
        this.courseService.countCourse({where:{
          status: true
        }}),
        this.courseService.findAll({skip: +query.skip, take: +query.take, where:{
          status: true
        }})
      ])
      return res.status(statusCode).json({
        total,
        courses,
        statusCode
      })
    } catch (err) {
      throw new InternalServerErrorException(`server on error ${JSON.stringify(err)}`)
    }
  }

  @Get(':id')
  async findOne(@Param('id',ParsePostgresIdPipe) id: string,@Res() res: Response) {
    const statusCode = HttpStatus.OK
    return res.status(statusCode).json({
      statusCode,
      message: "course ok",
      course: await this.courseService.findIdCourse(id)
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "updated course sucessfull",
      course: await this.courseService.update(id,updateCourseDto)
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "delete course sucessfull",
      grade: await this.courseService.remove(id)
    })
  }
}
