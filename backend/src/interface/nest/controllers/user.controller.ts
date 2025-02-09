import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { CreateUserDTO } from "../../../application/use-cases/user/CreateUserDTO";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { GetAllUsersUseCase } from "../../../application/use-cases/user/GetAllUsersUseCase";
import { GetUserUseCase } from "../../../application/use-cases/user/GetUserUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/user/DeleteUserUseCase";
import { LoginUserDTO } from "../../../application/use-cases/user/LoginUserDTO";
import { AuthService } from "../../../infrastructure/auth/AuthService";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { DriverNotFoundException } from "../../../domain/exceptions/user/DriverNotFoundException";
import { InvalidDriverDataException } from "../../../domain/exceptions/user/InvalidDriverDataException";

import { ZodError } from "zod";
import { AdminGuard } from "../guards/AdminGuard";

@Controller("users")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post("register")
  async register(@Body() body: CreateUserDTO) {
    try {
      return await this.createUserUseCase.execute(body);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Inscription échouée",
          errors: error.format(),
        });
      }

      if (error instanceof EmailAlreadyExistsException) {
        throw new BadRequestException(error.message);
      }

      if (error instanceof CompanyNotFoundException) {
        throw new BadRequestException(error.message);
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
    return { message: "Profil utilisateur", user: (req as any).user };
  }

  // Les routes suivantes nécessitent que l'utilisateur soit ADMIN

  @UseGuards(AdminGuard)
  @Get("all")
  async getAllUsers() {
    return await this.getAllUsersUseCase.execute();
  }

  @UseGuards(AdminGuard)
  @Get(":id")
  async getUser(@Param("id") id: string) {
    try {
      return await this.getUserUseCase.execute(id);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() updateData: any) {
    try {
      return await this.updateUserUseCase.execute(id, updateData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: "Validation échouée",
          errors: error.format(),
        });
      }
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof CompanyNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof DriverNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof EmailAlreadyExistsException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof InvalidDriverDataException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    try {
      await this.deleteUserUseCase.execute(id);
      return { message: "Utilisateur supprimé" };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
