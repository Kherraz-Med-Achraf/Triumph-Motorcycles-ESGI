import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { CreateUserDTO, CreateUserSchema } from "./CreateUserDTO";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(input: CreateUserDTO): Promise<UserEntity> {
    //validation Zod
    const dto = CreateUserSchema.parse(input);

    // verification si l'email existe déjà
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    //hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Convert licenseExpiration string en Date
    let licenseExpirationDate: Date | undefined;
    if (dto.role === "DRIVER" && dto.licenseExpiration) {
      licenseExpirationDate = new Date(dto.licenseExpiration);
    }

    const user = new UserEntity(
      uuidv4(),
      dto.email,
      hashedPassword,
      dto.role,
      dto.nom,
      dto.prenom,

      // motorcycleId
      dto.motorcycleId,

      // licenseExpiration
      licenseExpirationDate,
      dto.licenseCountry,
      dto.licenseNumber,

      // experience
      dto.experience,

      // address
      dto.address
    );

    return await this.userRepo.create(user);
  }
}
