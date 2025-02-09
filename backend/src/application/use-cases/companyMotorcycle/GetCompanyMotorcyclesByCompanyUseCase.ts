import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";

export class GetCompanyMotorcyclesByCompanyUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(companyId: string): Promise<CompanyMotorcycleEntity[]> {
    return this.companyMotorcycleRepo.findAllByCompany(companyId);
  }
}
