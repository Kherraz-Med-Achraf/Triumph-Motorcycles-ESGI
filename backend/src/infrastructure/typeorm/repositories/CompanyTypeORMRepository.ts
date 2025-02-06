// src/infrastructure/typeorm/repositories/CompanyTypeORMRepository.ts
import { Repository } from "typeorm";
import { CompanyEntity } from "../../../domain/entities/CompanyEntity";
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository";
import { CompanyTypeORMEntity } from "../entities/CompanyTypeORMEntity";

export class CompanyTypeORMRepository implements CompanyRepository {
  constructor(private ormRepo: Repository<CompanyTypeORMEntity>) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.address = company.address;
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
      entity.address,
      entity.createdAt
    );
  }

  async findByName(name: string): Promise<CompanyEntity | null> {
    const entity = await this.ormRepo.findOne({ where: { name } }); 
    if (!entity) return null;

    return new CompanyEntity(
      entity.id,
      entity.name,
      entity.address,
      entity.createdAt
    );
  }

  async findAll(): Promise<CompanyEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => 
      new CompanyEntity(
        ent.id,
        ent.name,
        ent.address,
        ent.createdAt
      )
    );
  }

  async update(company: CompanyEntity): Promise<CompanyEntity> {
    const entity = new CompanyTypeORMEntity();
    entity.id = company.id;
    entity.name = company.name;
    entity.address = company.address;
    entity.createdAt = company.createdAt;

    await this.ormRepo.save(entity);
    return company;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
