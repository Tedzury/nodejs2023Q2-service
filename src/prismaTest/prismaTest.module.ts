import { Module } from '@nestjs/common';
import { prismaTestService } from './prismaTest.service';

@Module({
  providers: [prismaTestService],
  exports: [prismaTestService],
})
export class prismaTestModule {}
