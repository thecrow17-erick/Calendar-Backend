import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ManagementService } from './management.service';
import { CreateManagementDto,UpdateManagementDto,queryManagementDto } from './dto';
import { ParsePostgresIdPipe } from 'src/common/pipes/parse-postgres-id';

@Controller('management')
export class ManagementController {
  constructor(private readonly managementService: ManagementService) {}

  @Post()
  async create(@Body() createManagementDto: CreateManagementDto,@Res() res:Response) {
    const created = HttpStatus.CREATED;
    return res.status(created).json({
        message : "Management create sucessfull",
        management: await  this.managementService.create(createManagementDto),
        statusCode: created
      })
    } 

  @Get()
  async findAll(@Query() query: queryManagementDto, @Res() res: Response) {
    const statusCode = HttpStatus.OK
    try {
      const [total, managements] = await Promise.all([
        this.managementService.countManagement({}),
        this.managementService.findAll({skip: +query.skip, take: +query.take, where:{
          status: true
        }})
      ])
      return res.status(statusCode).json({
        total,
        managements,
        statusCode
      })
    } catch (err) {
      throw new InternalServerErrorException(`server on error ${JSON.stringify(err)}`)
    }

  }

  @Get(':id')
  async findOne(@Param('id',ParsePostgresIdPipe) id: string,@Res() res: Response) {
    const statusCode = HttpStatus.OK;
    return res.status(statusCode).json({
      statusCode,
      management: await this.managementService.findIdManagement(id),
      message: "Management ok"
    }) 
  }

  @Patch(':id') 
  async update(@Param('id',ParsePostgresIdPipe) id: string, @Body() updateManagementDto: UpdateManagementDto,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      management: await this.managementService.update(id,updateManagementDto),
      message: "Update management sucessfull"
    })
  }

  @Delete(':id')
  async remove(@Param('id',ParsePostgresIdPipe) id: string,@Res() res: Response) {
    const statusCode = HttpStatus.ACCEPTED
    return res.status(statusCode).json({
      statusCode,
      management: await this.managementService.remove(id),
      message: "delete management sucessfull"
    })
  }
}
