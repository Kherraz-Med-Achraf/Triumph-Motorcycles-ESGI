import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { AppDataSource } from '../../infrastructure/db/typeorm.config';

async function bootstrap() {
  try {
    console.log('🚀 Initialisation de la base de données...');
    await AppDataSource.initialize();
    console.log('✅ Base de données connectée !');

    const app = await NestFactory.create(AppModule);

    // Activer CORS
    app.enableCors({
      origin: 'http://localhost:5173', // Autorise uniquement cette origine
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Si vous utilisez des cookies
    });

    await app.listen(3000);
    console.log(`✅ NestJS est en cours d'exécution sur http://localhost:3000 🚀`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de TypeORM :', error);
    process.exit(1);
  }
}

bootstrap();
