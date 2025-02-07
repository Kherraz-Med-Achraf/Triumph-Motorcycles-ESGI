import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserProviders } from "../providers/user";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { CompanyProviders } from "../providers/company";
import { AdminGuard } from "../guards/AdminGuard";

@Module({
  controllers: [UserController],
  providers: [...UserProviders, ...CompanyProviders, AdminGuard],
  exports: [...UserProviders],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "users/me", method: RequestMethod.GET },
        { path: "users/all", method: RequestMethod.GET },
        { path: "users/:id", method: RequestMethod.GET },
        { path: "users/:id", method: RequestMethod.PUT },
        { path: "users/:id", method: RequestMethod.DELETE }
      );
  }
}
