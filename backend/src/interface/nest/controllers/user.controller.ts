import { Controller, Get, Post, Body, Req, BadRequestException } from "@nestjs/common"; 
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/use-cases/user/CreateUserDTO";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { LoginUserDTO } from "../../../application/use-cases/user/LoginUserDTO";
import { AuthService } from "../../../infrastructure/auth/AuthService";

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
      const user = await this.loginUserUseCase.execute(body);
      const token = AuthService.generateToken(user);

      return { message: "Connexion réussie", token };
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

  @Get("me")
  async getProfile(@Req() req: Request) {
    return { message: "Profil utilisateur", user: req };
  }
}
