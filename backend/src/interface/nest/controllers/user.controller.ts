import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/use-cases/user/CreateUserDTO";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { LoginUserDTO } from "../../../application/use-cases/user/LoginUserDTO";


import { ZodError } from "zod";

@Controller("users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  @Post("register")
  async register(@Body() body: CreateUserDTO) {
    try {
      return await this.createUserUseCase.execute(body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation failed",
          errors: error.format(),
        });
      }

      throw error;
    }
  }

  @Post("login")
  async login(@Body() body: LoginUserDTO) {
    try {
      const isAuthenticated = await this.loginUserUseCase.execute(body);
      return { message: "Connexion réussie", authenticated: isAuthenticated };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation failed",
          errors: JSON.parse(error.message),
        });
      }

      throw new BadRequestException("Email ou mot de passe incorrect");
    }
  }
}
