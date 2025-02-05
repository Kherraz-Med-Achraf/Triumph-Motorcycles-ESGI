import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { CreateUserDTO, CreateUserSchema } from "./CreateUserDTO";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    // Validation Zod
    const dto = CreateUserSchema.parse(input);

    // Vérification si l'email existe déjà
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Conversion de licenseExpiration string en Date
    let licenseExpirationDate: Date | undefined;
    if (
      (dto.role === "DRIVER" || dto.role === "CLIENT") &&
      dto.licenseExpiration
    ) {
      licenseExpirationDate = new Date(dto.licenseExpiration);
    }

    const user = new UserEntity(
      uuidv4(),
      dto.email,
      hashedPassword,
      dto.role,
      dto.nom,
      dto.prenom,
      new Date(), // createdAt
      dto.motorcycleId,
      licenseExpirationDate,
      dto.licenseCountry,
      dto.licenseNumber,
      dto.address,
      dto.experience
    );

    return await this.userRepo.create(user);
  }
}
