import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";
import { UpdateCompanyMotorcycleDTO } from "./UpdateCompanyMotorcycleDTO";

export class UpdateCompanyMotorcycleUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(dto: UpdateCompanyMotorcycleDTO): Promise<CompanyMotorcycleEntity | null> {

    const existingLink = await this.companyMotorcycleRepo.findById(dto.id);

    if (!existingLink) {
      return null; 
    }


    if (dto.companyId !== undefined) {
      existingLink.companyId = dto.companyId;
    }

    if (dto.motorcycleId !== undefined) {
      existingLink.motorcycleId = dto.motorcycleId;
    }

    if (dto.assignedAt !== undefined) {
      existingLink.assignedAt = dto.assignedAt;
    }

    const updated = await this.companyMotorcycleRepo.update(existingLink);
    return updated;
  }
}
