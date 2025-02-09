import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";

export class DeleteCompanyMotorcycleUseCase {
  constructor(
    private companyMotorcycleRepo: CompanyMotorcycleRepository
  ) {}

  public async execute(id: string): Promise<void> {
    await this.companyMotorcycleRepo.delete(id);
  }
}
