import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { ManagementModule } from './management/management.module';
import { CourseModule } from './course/course.module';
import { GradeModule } from './grade/grade.module';
import { ParallelModule } from './parallel/parallel.module';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [PrismaModule, StudentModule, ManagementModule, CourseModule, GradeModule, ParallelModule, ExcelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
