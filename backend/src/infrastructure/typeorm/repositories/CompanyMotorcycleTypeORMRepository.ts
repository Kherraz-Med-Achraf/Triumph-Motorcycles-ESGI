import { Repository } from "typeorm";
import { CompanyMotorcycleEntity } from "../../../domain/entities/CompanyMotorcycleEntity";
import { CompanyMotorcycleRepository } from "../../../domain/repositories/CompanyMotorcycleRepository";
import { CompanyMotorcycleTypeORMEntity } from "../entities/CompanyMotorcycleTypeORMEntity";

export class CompanyMotorcycleTypeORMRepository implements CompanyMotorcycleRepository {
  constructor(private ormRepo: Repository<CompanyMotorcycleTypeORMEntity>) {}

  async create(link: CompanyMotorcycleEntity): Promise<CompanyMotorcycleEntity> {
    const entity = new CompanyMotorcycleTypeORMEntity();
    entity.id = link.id;
    entity.companyId = link.companyId;
    entity.motorcycleId = link.motorcycleId;
    entity.createdAt = link.createdAt;

    await this.ormRepo.save(entity);
    return link;
  }

  async findById(id: string): Promise<CompanyMotorcycleEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new CompanyMotorcycleEntity(
      entity.id,
      entity.companyId,
      entity.motorcycleId,
      entity.createdAt
    );
  }

  async findAllByCompany(companyId: string): Promise<CompanyMotorcycleEntity[]> {
    const entities = await this.ormRepo.findBy({ companyId });
    return entities.map(ent => new CompanyMotorcycleEntity(
      ent.id,
      ent.companyId,
      ent.motorcycleId,
      ent.createdAt
    ));
  }

  async update(link: CompanyMotorcycleEntity): Promise<CompanyMotorcycleEntity> {
    const entity = new CompanyMotorcycleTypeORMEntity();
    entity.id = link.id;
    entity.companyId = link.companyId;
    entity.motorcycleId = link.motorcycleId;
    entity.createdAt = link.createdAt;

    await this.ormRepo.save(entity);
    return link;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
