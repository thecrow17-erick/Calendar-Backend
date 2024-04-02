import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import * as multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaModule } from 'src/prisma';
import { StudentModule } from 'src/student/student.module';
import { ManagementModule } from 'src/management/management.module';
import { ParallelModule } from 'src/parallel/parallel.module';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  imports:[
    MulterModule.register({
      storage: multer.diskStorage({
        destination(req, file, callback) {
          callback(null,'/tmp/')
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = file.originalname.split('.')[1]
          callback(null, file.fieldname + '-' + uniqueSuffix+'.'+extension);
        },
      }),
    }),
    PrismaModule,
    StudentModule,
    ManagementModule,
    ParallelModule
  ]
})
export class ExcelModule {}
