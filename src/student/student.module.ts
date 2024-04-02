import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [PrismaModule],
  exports: [StudentService]
})
export class StudentModule {}
