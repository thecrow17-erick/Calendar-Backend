import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

import { GradeService } from './grade.service';
import { CreateGradeDto,UpdateGradeDto  } from './dto';
import { queryPagesDto } from 'src/common/dto';
import { ParsePostgresIdPipe } from 'src/common/pipes/parse-postgres-id';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  async reate(@Body() createGradeDto: CreateGradeDto,@Res() res: Response) {
    const statusCode = HttpStatus.CREATED;
    return res.status(statusCode).json({
      message: "Grade created sucessfull",
      statusCode,
      grade: await this.gradeService.create(createGradeDto) 
    })
  }

  @Get()
  async findAll(@Query() query: queryPagesDto,@Res() res: Response) {
    const statusCode = HttpStatus.OK
    try {
      const [total, grades] = await Promise.all([
        this.gradeService.countGrade({where:{
          status: true
        }}),
        this.gradeService.findAll({skip: +query.skip, take: +query.take, where:{
          status: true
        }})
      ])
      return res.status(statusCode).json({
        total,
        grades,
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
      message: "grade ok",
      grade: await this.gradeService.findIdGrade(id)
    })
  }

  @Patch(':id')
  async update(@Param('id',ParsePostgresIdPipe) id: string, @Body() updateGradeDto: UpdateGradeDto,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "updated grade sucessfull",
      grade: await this.gradeService.update(id,updateGradeDto)
    })
  }

  @Delete(':id')
  async remove(@Param('id',ParsePostgresIdPipe) id: string,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "delete grade sucessfull",
      grade: await this.gradeService.remove(id)
    })
  }
}
