import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { CompanyController } from "../controllers/company.controller";
import { CompanyProviders } from "../providers/company";
import { UserProviders } from "../providers/user";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

@Module({
  controllers: [CompanyController],
  providers: [...CompanyProviders, ...UserProviders],
  exports: [...CompanyProviders],
})
export class CompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "companies/create", method: RequestMethod.POST }, 
        { path: "companies", method: RequestMethod.GET }, 
        { path: "companies/:id", method: RequestMethod.GET },
        { path: "companies/:id", method: RequestMethod.PUT }, 
        { path: "companies/:id", method: RequestMethod.DELETE } 
      );
  }
}
