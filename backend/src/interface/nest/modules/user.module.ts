import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserUseCaseProviders } from '../providers/user/UserUseCaseProviders';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

@Module({
  controllers: [UserController],
  providers: [...UserUseCaseProviders],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .forRoutes(
        { path: 'users/protected', method: RequestMethod.GET }, // Protège `/users/protected`
        { path: 'users/me', method: RequestMethod.GET }
      );
  }
}
