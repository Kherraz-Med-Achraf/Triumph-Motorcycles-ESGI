import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConcessionController } from "../controllers/concession.controller";
import { ConcessionProviders } from "../providers/concession";
import { UserProviders } from "../providers/user";
import { CompanyProviders } from "../providers/company";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

@Module({
  controllers: [ConcessionController],
  providers: [...ConcessionProviders, ...UserProviders, ...CompanyProviders],
  exports: [...ConcessionProviders],
})
export class ConcessionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "concessions/create", method: RequestMethod.POST },
        { path: "concessions", method: RequestMethod.GET },
        { path: "concessions/:id", method: RequestMethod.GET },
        { path: "concessions/:id", method: RequestMethod.PUT },
        { path: "concessions/:id", method: RequestMethod.DELETE }
      );
  }
}
