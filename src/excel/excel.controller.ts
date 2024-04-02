import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelStudentsDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  //ingresar estudiantes a un aula y/o crear estudiantes si no existen
  @Post('students')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file:Express.Multer.File , @Body() createExcelStudentsDto: CreateExcelStudentsDto, @Res() res: Response) {
    const statusCode = HttpStatus.CREATED;
    return res.status(statusCode).json({
      statusCode,
      message: await this.excelService.createExcelStudents(createExcelStudentsDto,file)
    })
  }

  @Get()
  findAll() {
    return this.excelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.excelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return 'dsafwqq';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.excelService.remove(+id);
  }
}
