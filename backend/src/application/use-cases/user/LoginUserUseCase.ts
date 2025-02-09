import { UserRepository } from "../../../domain/repositories/UserRepository";
import * as bcrypt from "bcrypt";
import { LoginUserDTO, LoginUserSchema } from "./LoginUserDTO";
import { ZodError } from "zod";
import { UserEntity } from "../../../domain/entities/UserEntity";

export class LoginUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: LoginUserDTO): Promise<UserEntity> {
    try {
      
      const dto = LoginUserSchema.parse(input);

      
      const user = await this.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Mot de passe incorrect");
      }

      return user;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(JSON.stringify(error.format())); 
      }
      throw error;
    }
  }
}
