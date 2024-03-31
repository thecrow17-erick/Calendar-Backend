import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, InternalServerErrorException } from '@nestjs/common';
import { ParallelService } from './parallel.service';
import { CreateParallelDto,UpdateParallelDto } from './dto';
import { Response } from 'express';
import { queryPagesDto } from 'src/common/dto';
import { ParsePostgresIdPipe } from 'src/common/pipes/parse-postgres-id';

@Controller('parallel')
export class ParallelController {
  constructor(private readonly parallelService: ParallelService) {}

  @Post()
  async create(@Body() createParallelDto: CreateParallelDto,@Res() res: Response) {
    const statusCode = HttpStatus.CREATED;
    return res.status(statusCode).json({
      message: "Parallel created sucessfull",
      statusCode,
      grade: await this.parallelService.create(createParallelDto) 
    })
  }

  @Get()
  async findAll(@Query() query: queryPagesDto,@Res() res: Response) {
    const statusCode = HttpStatus.OK
    try {
      const [total, parallels] = await Promise.all([
        this.parallelService.countParallel({where:{
          status: true
        }}),
        this.parallelService.findAll({
          skip: +query.skip, 
          take: +query.take, 
          where:{
            status: true
          },
          select:{
            id: true,
            name: true,
            course: {
              select:{
                id: true,
                name: true
              }
            },
            createdAt: true,
            updatedAt: true
          }
      })
      ])
      return res.status(statusCode).json({
        total,
        parallels,
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
      parallel: await this.parallelService.findIdParallel(id)
    })
  }

  @Patch(':id')
  async update(@Param('id',ParsePostgresIdPipe) id: string, @Body() updateParallelDto: UpdateParallelDto,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "updated parallel sucessfull",
      parallel: await this.parallelService.update(id,updateParallelDto)
    })
  }

  @Delete(':id')
  async remove(@Param('id',ParsePostgresIdPipe) id: string,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      message: "delete parallel sucessfull",
      grade: await this.parallelService.remove(id)
    })
  }
}
