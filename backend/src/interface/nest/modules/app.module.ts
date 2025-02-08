import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { CompanyModule } from './company.module';
import { AppController } from '../controllers/app.controller';

@Module({
  imports: [UserModule, CompanyModule],
  controllers: [AppController], //temporary controller hello world
})
export class AppModule {}
