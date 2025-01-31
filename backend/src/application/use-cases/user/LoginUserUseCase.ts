import { UserRepository } from "../../../domain/repositories/UserRepository";
import * as bcrypt from "bcrypt";
import { LoginUserDTO, LoginUserSchema } from "./LoginUserDTO";
import { ZodError } from "zod";

export class LoginUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: LoginUserDTO): Promise<boolean> {
    try {
      // Validation avec Zod
      const dto = LoginUserSchema.parse(input);

      //Vérifier si l'utilisateur existe
      const user = await this.userRepo.findByEmail(dto.email);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }

      //Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Mot de passe incorrect");
      }

      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(JSON.stringify(error.format())); 
      }
      throw error;
    }
  }
}
