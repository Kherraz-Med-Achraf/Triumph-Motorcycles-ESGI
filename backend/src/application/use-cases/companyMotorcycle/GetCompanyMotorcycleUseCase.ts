import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";

export class GetCompanyMotorcycleUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(id: string): Promise<CompanyMotorcycleEntity | null> {
    return this.companyMotorcycleRepo.findById(id);
  }
}
