
import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";
import { v4 as uuidv4 } from "uuid";
import { CreateCompanyMotorcycleDTO } from "./CreateCompanyMotorcycleDTO";

export class CreateCompanyMotorcycleUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(
    dto: CreateCompanyMotorcycleDTO
  ): Promise<CompanyMotorcycleEntity> {
    const id = uuidv4();

    const link = new CompanyMotorcycleEntity(
      id,
      dto.companyId,
      dto.motorcycleId,
      new Date(), 
      new Date()  
    );
    const createdLink = await this.companyMotorcycleRepo.create(link);
    return createdLink;
  }
}
