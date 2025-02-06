import { EmailAlreadyExistsException } from "../../../../domain/exceptions/EmailAlreadyExistsException";
import { CreateUserDTO, CreateUserSchema } from "./CreateUserDTO";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../../../domain/entities/UserEntity";
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { DriverEntity } from "../../../../domain/entities/DriverEntity";
import { DriverRepository } from "../../../../domain/repositories/DriverRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private driverRepo: DriverRepository 
  ) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    // Validation avec Zod
    const dto = CreateUserSchema.parse(input);

    // Vérification si l'email existe déjà
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Génération de l'ID utilisateur
    const userId = uuidv4();

    // Création de l'utilisateur
    const user = new UserEntity(
      userId,
      dto.email,
      hashedPassword,
      dto.role,
      dto.nom,
      dto.prenom,
      new Date() // createdAt
    );

    // Sauvegarde de l'utilisateur
    const createdUser = await this.userRepo.create(user);

    // Si l'utilisateur est un DRIVER, créer aussi un DriverEntity
    if (dto.role === "DRIVER") {

      // Vérification que companyMotorcycleId est bien lié à companyId (si besoin)
      // if (!dto.companyId || !dto.companyMotorcycleId) {
      //   throw new Error("companyId et companyMotorcycleId sont requis pour un DRIVER.");
      // }

      const driver = new DriverEntity(
        uuidv4(), // ID du driver
        userId, // Associer le userId au driver
        dto.experience, 
        dto.licenseExpiration ? new Date(dto.licenseExpiration) : undefined,
        dto.licenseCountry,
        dto.licenseNumber,
        dto.companyId, // Associer le driver à une company
        dto.companyMotorcycleId // Lier le driver à une moto spécifique de la company
      );

      await this.driverRepo.create(driver);
    }

    return createdUser;
  }
}
