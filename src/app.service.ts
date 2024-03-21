import { Injectable } from '@nestjs/common';
// import { Injectable, Inject } from '@nestjs/common';
// import { prismaTestService } from './prismaTest/prismaTest.service';

@Injectable()
export class AppService {
  // constructor(@Inject(prismaTestService) private database: prismaTestService) {}
  // getTests(): string {
  //   return this.database.test.findMany();
  // }
  // addTest(dto: { name: string; age: number }) {
  //   return this.database.test.create({ data: dto });
  // }
  getTests(): string {
    return 'zalupa';
  }
  addTest() {
    return 'zalupa2';
  }
}
