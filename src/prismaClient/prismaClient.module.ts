import { Module } from '@nestjs/common';
import { prismaClientService } from './prismaClient.service';

@Module({
  providers: [prismaClientService],
  exports: [prismaClientService],
})
export class prismaClientModule {}
