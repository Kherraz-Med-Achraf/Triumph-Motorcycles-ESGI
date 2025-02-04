// src/interface/nest/modules/user.module.ts
import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserProviders } from "../providers/user"; 

import { AuthMiddleware } from "../middleware/AuthMiddleware";

@Module({
  controllers: [UserController],
  providers: [...UserProviders],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "users/me", method: RequestMethod.GET },
        { path: "users/all", method: RequestMethod.GET } 
      );
  }
}
