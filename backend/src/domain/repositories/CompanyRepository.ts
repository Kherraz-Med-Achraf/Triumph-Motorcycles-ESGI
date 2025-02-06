import { CompanyEntity } from "../entities/CompanyEntity";

export interface CompanyRepository {
  create(company: CompanyEntity): Promise<CompanyEntity>;
  findById(id: string): Promise<CompanyEntity | null>;
  findByName(name: string): Promise<CompanyEntity | null>;
  findAll(): Promise<CompanyEntity[]>;
  update(company: CompanyEntity): Promise<CompanyEntity>;
  delete(id: string): Promise<void>;
}
