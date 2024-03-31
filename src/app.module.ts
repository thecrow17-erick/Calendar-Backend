import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [PrismaModule, StudentModule, ManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
