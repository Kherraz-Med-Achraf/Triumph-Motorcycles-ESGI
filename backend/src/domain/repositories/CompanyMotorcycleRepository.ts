import { CompanyMotorcycleEntity } from "../entities/CompanyMotorcycleEntity";

export interface CompanyMotorcycleRepository {
  create(link: CompanyMotorcycleEntity): Promise<CompanyMotorcycleEntity>;
  findById(id: string): Promise<CompanyMotorcycleEntity | null>;
  findAllByCompany(companyId: string): Promise<CompanyMotorcycleEntity[]>;
  update(link: CompanyMotorcycleEntity): Promise<CompanyMotorcycleEntity>;
  delete(id: string): Promise<void>;
}
