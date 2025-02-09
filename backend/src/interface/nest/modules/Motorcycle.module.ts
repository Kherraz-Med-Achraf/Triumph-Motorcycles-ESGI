import { Module } from "@nestjs/common";
import { MotorcycleController } from "../controllers/motorcycle.controller";
import { MotorcycleProviders } from "../providers/motorcycle";
import { ConcessionProviders } from "../providers/concession";
import { CompanyProviders } from "../providers/company"; 
import { UserProviders } from "../providers/user";

@Module({
  controllers: [MotorcycleController],
  providers: [...MotorcycleProviders,...ConcessionProviders, ...UserProviders,  ...CompanyProviders,],
})
export class MotorcycleModule {}
