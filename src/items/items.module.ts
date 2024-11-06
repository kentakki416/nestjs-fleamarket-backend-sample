import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsModule]
})
export class ItemsModule {}
