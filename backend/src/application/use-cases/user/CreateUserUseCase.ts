import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserEntity, UserRole } from "../../../domain/entities/UserEntity";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDTO, CreateUserSchema } from "./CreateUserDTO";
import { ZodError } from "zod";
import * as bcrypt from 'bcrypt';

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    try {
      const dto = CreateUserSchema.parse(input); // Validation avec ZOD


      // Vérifier si l'email existe déjà
      const existing = await this.userRepo.findByEmail(dto.email);
      if (existing) {
        throw new Error("Email existe deja");
      }

      const newId = uuidv4();

      const hashedPassword = await bcrypt.hash(dto.password, 10); // Hash sécurisé avec grain de sel de 10


      // Créer l'objet de domaine
      const user = new UserEntity(
        newId,
        dto.email,
        hashedPassword,
        dto.role,
        new Date()
      );
      return await this.userRepo.create(user);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(JSON.stringify(error.format())); 
      }
      throw error;
    }
  }
}
