import { Module } from '@nestjs/common';

import { ParallelService } from './parallel.service';
import { ParallelController } from './parallel.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  controllers: [ParallelController],
  providers: [ParallelService],
  imports:[PrismaModule]
})
export class ParallelModule {}
