import { Injectable, InternalServerErrorException, NotFoundException, UploadedFile } from '@nestjs/common';

import { CreateExcelStudentsDto } from './dto';
import { ExcelStudent } from './entities';
import { convertCsvToJson } from './helper';
import { CreateStudentDto } from 'src/student/dto';
import { PrismaService } from 'src/prisma';
import { StudentService } from 'src/student/student.service';
import { ManagementService } from 'src/management/management.service';
import { ParallelService } from 'src/parallel/parallel.service';



@Injectable()
export class ExcelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly studentService: StudentService,
    private readonly managementService: ManagementService,
    private readonly parallelService: ParallelService
  ){}

  async createExcelStudents(createExcelStudentsDto: CreateExcelStudentsDto, @UploadedFile() file:Express.Multer.File) {
    const data = await convertCsvToJson(file.path) as ExcelStudent[];
    const students = data.map(student => ({
      name: student.Nombre,
      ci:   student.CI,
      email: student.Correo,
      dad_lastname: student['Apellido Paterno'],
      mother_lastname: student['Apellido Materno'],
      phone: student.Celular,
      sex: student.Sexo
    })) as CreateStudentDto[];

    await Promise.all([
      this.managementService.findIdManagement(createExcelStudentsDto.managementId),
      this.parallelService.findIdParallel(createExcelStudentsDto.parallelId)
    ])
    try {
      const studentsExists = await this.prisma.student.findMany({
        where:{
          OR: students.map(student => ({ci: student.ci}))
        }
      })
      const studentsNotExist = students.filter(value => !studentsExists.some(student => student.ci === value.ci))
      if(studentsNotExist.length > 0){
        await this.studentService.createManyStudents(studentsNotExist);
      }
      const studentsIdExcel = await this.prisma.student.findMany({
        where:{
          OR: students.map(student => ({ci: student.ci}))
        },
        select:{
          id:true,
          registration:{
            select:{
              managementId: true,
              parallelId: true,
            }
          }
        }
      });
      //pregunto si el estudiante esta en algun curso esta gestion o ningun curso de la gestion
      const studentRegisterEmpty = studentsIdExcel.filter(student => {
        if(student.registration.length === 0){
          return student;
        }
        student.registration.map(register => {
          if(register.managementId !== createExcelStudentsDto.managementId
            && register.parallelId === createExcelStudentsDto.parallelId){
            return student;
          }

          if(register.parallelId !== createExcelStudentsDto.parallelId 
            && register.managementId !== createExcelStudentsDto.managementId){
              return student;
          }
        })
      });
      //Hago la validacion si el tamanho del arreglo es 0, los alumnos ya estan registrados
      if(studentRegisterEmpty.length === 0) 
        throw new NotFoundException('students are already registered in the classroom')
    
      //inserto a los datos de clases 
      const studentsInClasses = await this.prisma.registration_Course.createMany({
        data: studentRegisterEmpty.map(student => ({
          studentId: student.id,
          parallelId: createExcelStudentsDto.parallelId,
          managementId: createExcelStudentsDto.managementId
        }))
      })

      return `The ${studentsInClasses.count} students registered in the classroom`;
     } catch (err) {
      console.log(err);
      if(err instanceof NotFoundException)
        throw err;
      throw new InternalServerErrorException(`server error on ${JSON.stringify(err)}`)
    }
  }

  findAll() {
    return `This action returns all excel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} excel`;
  }

  update(id: number) {
    return `This action updates a #${id} excel`;
  }

  remove(id: number) {
    return `This action removes a #${id} excel`;
  }
}
