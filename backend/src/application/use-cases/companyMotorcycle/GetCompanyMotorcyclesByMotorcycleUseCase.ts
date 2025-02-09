import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";

export class GetCompanyMotorcyclesByMotorcycleUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(motorcycleId: string): Promise<CompanyMotorcycleEntity[]> {
    return this.companyMotorcycleRepo.findAllByMotorcycle(motorcycleId);
  }
}
