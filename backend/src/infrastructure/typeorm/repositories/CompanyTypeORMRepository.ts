import { Repository } from 'typeorm';
import { CompanyEntity } from '../../../domain/entities/CompanyEntity';
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';
import { CompanyTypeORMEntity } from '../entities/CompanyTypeORMEntity';

export class CompanyTypeORMRepository implements CompanyRepository {
  constructor(private ormRepo: Repository<CompanyTypeORMEntity>) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.managerId = company.managerId;

    await this.ormRepo.save(entity);
    return company;
  }

  async findById(id: string): Promise<CompanyEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return new CompanyEntity(entity.id, entity.name, entity.managerId);
  }

  async update(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.managerId = company.managerId;

    await this.ormRepo.save(entity);
    return company;
  }
}
