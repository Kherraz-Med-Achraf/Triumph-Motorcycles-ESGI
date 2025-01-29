import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CompanyEntity } from '../../../domain/entities/CompanyEntity';
import { v4 as uuid } from 'uuid';

export interface CreateCompanyDTO {
  name: string;
  managerUserId: string;
}

export class CreateCompanyUseCase {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository,
  ) {}

  async execute(dto: CreateCompanyDTO): Promise<CompanyEntity> {
    // Vérifier si le manager existe
    const manager = await this.userRepo.findById(dto.managerUserId);
    if (!manager) {
      throw new Error('Manager user does not exist');
    }
    if (manager.role !== 'MANAGER_COMPANY') {
      throw new Error('User is not a MANAGER_COMPANY');
    }

    const company = new CompanyEntity(
      uuid(),
      dto.name,
      manager.id,
    );
    return await this.companyRepo.create(company);
  }
}
