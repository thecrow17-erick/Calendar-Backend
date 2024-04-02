import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { PrismaModule } from 'src/prisma';

@Module({
  controllers: [ManagementController],
  providers: [ManagementService],
  imports: [PrismaModule],
  exports: [ManagementService]
})
export class ManagementModule {}
