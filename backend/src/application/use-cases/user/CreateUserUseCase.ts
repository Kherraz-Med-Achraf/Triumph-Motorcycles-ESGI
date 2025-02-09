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
   
    const dto = CreateUserSchema.parse(input);

    
    const existing = await this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    
    if (dto.role === "DRIVER") {
      if (dto.companyId) {
        const company = await this.companyRepo.findById(dto.companyId);
        if (!company) {
          throw new CompanyNotFoundException();
        }
      }
    }

    
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userId = uuidv4();

   
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

    
    if (dto.role === "DRIVER") {
      const driver = new DriverEntity(
        uuidv4(), 
        userId, 
        dto.experience,
        dto.licenseExpiration ? new Date(dto.licenseExpiration) : undefined,
        dto.licenseCountry,
        dto.licenseNumber,
        dto.companyId || undefined,
        dto.companyMotorcycleId || undefined
      );

      await this.driverRepo.create(driver);
    }

    return createdUser;
  }
}
