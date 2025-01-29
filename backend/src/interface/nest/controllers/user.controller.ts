import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase, RegisterUserDTO } from '../../../application/use-cases/user/RegisterUserUseCase';

@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDTO) {
    const user = await this.registerUserUseCase.execute(dto);
    return { message: 'User created', user };
  }
}
