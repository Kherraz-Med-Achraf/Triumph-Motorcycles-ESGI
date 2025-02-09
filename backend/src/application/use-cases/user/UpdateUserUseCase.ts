import { UserRepository } from "../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../domain/repositories/DriverRepository";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { UserEntity } from "../../../domain/entities/UserEntity";
import * as bcrypt from "bcrypt";
import { UpdateUserDTO, UpdateUserSchema } from "./UpdateUserDTO";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { DriverNotFoundException } from "../../../domain/exceptions/user/DriverNotFoundException";
import { EmailAlreadyExistsException } from "../../../domain/exceptions/EmailAlreadyExistsException";
import { CompanyNotFoundException } from "../../../domain/exceptions/company/CompanyNotFoundException";

export class UpdateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private driverRepo: DriverRepository,
    private companyRepo: CompanyRepository
  ) {}

  /**
   * @param userId Identifiant de l'utilisateur à mettre à jour.
   * @param updateData Données à mettre à jour.
   */

  async execute(
    userId: string,
    updateData: UpdateUserDTO
  ): Promise<UserEntity> {
    const dto: UpdateUserDTO = UpdateUserSchema.parse(updateData);

    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (dto.email) {
      const existingUser = await this.userRepo.findByEmail(dto.email);
      if (existingUser && existingUser.id !== userId) {
        throw new EmailAlreadyExistsException();
      }
      user.email = dto.email;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }
    if (dto.nom) {
      user.nom = dto.nom;
    }
    if (dto.prenom) {
      user.prenom = dto.prenom;
    }

    const updatedUser = await this.userRepo.update(user);

    if (updatedUser.role === "DRIVER") {
      const driver = await this.driverRepo.findByUserId(userId);
      if (!driver) {
        throw new DriverNotFoundException();
      }
      if (dto.experience !== undefined) {
        driver.experience = dto.experience;
      }
      if (dto.licenseExpiration) {
        driver.licenseExpiration = new Date(dto.licenseExpiration);
      }
      if (dto.licenseCountry) {
        driver.licenseCountry = dto.licenseCountry;
      }
      if (dto.licenseNumber) {
        driver.licenseNumber = dto.licenseNumber;
      }
      await this.driverRepo.update(driver);
    }

    return updatedUser;
  }
}
