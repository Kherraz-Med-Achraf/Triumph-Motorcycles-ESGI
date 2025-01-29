import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<h1 style="color: blue; font-family: Arial, sans-serif;">Hello from Nest Youri le BG! 😎</h1>';
  }
}
