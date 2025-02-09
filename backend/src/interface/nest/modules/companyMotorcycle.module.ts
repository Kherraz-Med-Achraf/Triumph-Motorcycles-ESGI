import { Module } from "@nestjs/common";
import { CompanyMotorcycleController } from "../controllers/companyMotorcycle.controller";
import { CompanyMotorcycleProviders } from "../providers/companyMotorcycle";

@Module({
  controllers: [CompanyMotorcycleController],
  providers: [...CompanyMotorcycleProviders],
})
export class CompanyMotorcycleModule {}
