import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { CreateUserDTO, CreateUserSchema } from "./CreateUserDTO";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { DriverEntity } from "../../../domain/entities/DriverEntity";
import { DriverRepository } from "../../../domain/repositories/DriverRepository";
import { v4 as uuidv4 } from "uuid";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private driverRepo: DriverRepository,
    private companyRepo: CompanyRepository
  ) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    // Validation avec Zod
    const dto = CreateUserSchema.parse(input);

    // Vérification si l'email existe déjà
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    // Pour un DRIVER, vérifier que l'entreprise existe AVANT de créer l'utilisateur
    if (dto.role === "DRIVER") {
      if (!dto.companyId) {
        throw new CompanyNotFoundException();
      }

      const company = await this.companyRepo.findById(dto.companyId);
      if (!company) {
        throw new CompanyNotFoundException();
      }
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userId = uuidv4();

    // Création de l'utilisateur
    const user = new UserEntity(
      userId,
      dto.email,
      hashedPassword,
      dto.role,
      dto.nom,
      dto.prenom,
      new Date() 
    );

    const createdUser = await this.userRepo.create(user);

    // Si l'utilisateur est un DRIVER, créer aussi un DriverEntity
    if (dto.role === "DRIVER") {
      const driver = new DriverEntity(
        uuidv4(), // ID du driver
        userId,   // Associer le userId au driver
        dto.experience,
        dto.licenseExpiration ? new Date(dto.licenseExpiration) : undefined,
        dto.licenseCountry,
        dto.licenseNumber,
        dto.companyId,         // Associer le driver à une company
        dto.companyMotorcycleId  // Lier le driver à une moto spécifique de la company
      );

      await this.driverRepo.create(driver);
    }

    return createdUser;
  }
}
