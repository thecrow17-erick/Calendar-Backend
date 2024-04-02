import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

import { CreateStudentDto,UpdateStudentDto } from './dto';
import { IOptionStudent } from './interface';
import { PrismaService } from 'src/prisma';
import { generatePassword } from './helper';

@Injectable()
export class StudentService {

  constructor(
    private readonly prisma: PrismaService
  ){}

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }


  async findAll({
    cursor,
    distinct,
    orderBy,
    select,
    skip,
    take,
    where
  }:IOptionStudent) {
    try {
      const students = await this.prisma.student.findMany({
        where,
        select,
        skip,
        take,
        orderBy,
        cursor,
        distinct,
      })

      return students;
    } catch (err) {
      throw new InternalServerErrorException(`server on error ${err}`)
    }
  }

  async createManyStudents(createStudentsDto: CreateStudentDto[]){
    const students = createStudentsDto.map((student) =>({
      ...student,
      password: bcrypt.hashSync(generatePassword(student.dad_lastname,student.ci),10)
    }))
    try {
      const studentsCreate = await this.prisma.student.createMany({
        data: students.map(student => ({...student, sex: student.sex === "F"?"Femenino": "Masculino"}))
      })
      return studentsCreate;
    } catch (err) {
      throw new InternalServerErrorException(`server on error ${err}`)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
