import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaClientModule } from 'src/prismaClient/prismaClient.module';

@Module({
  imports: [PrismaClientModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
