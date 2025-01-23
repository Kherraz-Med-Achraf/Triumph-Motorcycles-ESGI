import { NestFactory } from "@nestjs/core";
import { Module, Controller, Get } from "@nestjs/common";

// Contrôleur
@Controller()
class AppController {
  @Get()
  getHello(): string {
    return '<h1 style="color: blue; font-family: Arial, sans-serif;">Hello from Nest Youri le BG! 😎</h1>';
  }
}

// Module
@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Nest is running on http://localhost:3000`);
}

bootstrap();
