import { CompanyEntity } from "../entities/CompanyEntity";

export interface CompanyRepository {
  create(company: CompanyEntity): Promise<CompanyEntity>;
  findById(id: string): Promise<CompanyEntity | null>;
  update(company: CompanyEntity): Promise<CompanyEntity>;
}
