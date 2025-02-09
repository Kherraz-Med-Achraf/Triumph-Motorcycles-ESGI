import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";

export class GetAllCompanyMotorcyclesUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(): Promise<CompanyMotorcycleEntity[]> {
    return this.companyMotorcycleRepo.findAll();
  }
}
