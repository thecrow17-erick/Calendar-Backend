import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  controllers: [GradeController],
  providers: [GradeService],
  imports:[PrismaModule]
})
export class GradeModule {}
