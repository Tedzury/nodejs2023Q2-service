// import { Controller, Get, Post } from '@nestjs/common';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTests(): {} {
    return this.appService.getTests();
  }
  // getTests(): string {
  //   return this.appService.getTests();
  // }

  @Post()
  // addTest() {
  //   return this.appService.addTest();
  // }
  addTest(@Body() dto: { name: string; age: number }) {
    return this.appService.addTest(dto);
  }
}
