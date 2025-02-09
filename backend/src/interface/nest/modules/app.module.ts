import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { CompanyModule } from "./company.module";
import { ConcessionModule } from "./concession.module";
import { MotorcycleModule } from "./Motorcycle.module";
import { CompanyMotorcycleModule } from "./companyMotorcycle.module";
import { AppController } from "../controllers/app.controller";

@Module({
  imports: [
    UserModule,
    CompanyModule,
    ConcessionModule,
    MotorcycleModule,
    CompanyMotorcycleModule,
  ],
  controllers: [AppController], //temporary controller hello world
})
export class AppModule {}
