import { Repository } from 'typeorm';
import { CompanyTypeORMEntity } from '../entities/CompanyTypeORMEntity';
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';
import { CompanyEntity } from '../../../domain/entities/CompanyEntity';

export class CompanyTypeORMRepository implements CompanyRepository {
  constructor(private ormRepo: Repository<CompanyTypeORMEntity>) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.managerUserId = company.managerUserId;
    entity.createdAt = company.createdAt;

    await this.ormRepo.save(entity);
    return company;
  }

  async findById(id: string): Promise<CompanyEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return new CompanyEntity(
      entity.id,
      entity.name,
      entity.managerUserId,
      entity.createdAt
    );
  }

  async findAll(): Promise<CompanyEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => 
      new CompanyEntity(
        ent.id,
        ent.name,
        ent.managerUserId,
        ent.createdAt
      )
    );
  }

  async update(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.managerUserId = company.managerUserId;
    entity.createdAt = company.createdAt;

    await this.ormRepo.save(entity);
    return company;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
