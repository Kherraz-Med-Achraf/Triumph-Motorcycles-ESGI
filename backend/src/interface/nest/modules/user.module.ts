import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserUseCaseProviders } from '../providers/user/UserUseCaseProviders';

@Module({
  controllers: [UserController],
  providers: [...UserUseCaseProviders],
})
export class UserModule {}

