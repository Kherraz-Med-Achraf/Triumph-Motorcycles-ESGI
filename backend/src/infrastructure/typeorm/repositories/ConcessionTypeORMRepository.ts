import { Repository } from "typeorm";
import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { ConcessionTypeORMEntity } from "../entities/ConcessionTypeORMEntity";

export class ConcessionTypeORMRepository implements ConcessionRepository {
  constructor(private ormRepo: Repository<ConcessionTypeORMEntity>) {}

  async create(concession: ConcessionEntity): Promise<ConcessionEntity> {
    const entity = new ConcessionTypeORMEntity();
    entity.id = concession.id;
    entity.name = concession.name;
    entity.managerUserId = concession.managerUserId;
    entity.address = concession.address;
    entity.createdAt = concession.createdAt;

    await this.ormRepo.save(entity);
    return concession;
  }

  async findById(id: string): Promise<ConcessionEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new ConcessionEntity(
      entity.id,
      entity.name,
      entity.managerUserId,
      entity.address,
      entity.createdAt,
    );
  }

  async findByName(name: string): Promise<ConcessionEntity | null> {
    const entity = await this.ormRepo.findOneBy({ name });
    if (!entity) return null;

    return new ConcessionEntity(
      entity.id,
      entity.name,
      entity.managerUserId,
      entity.address,
      entity.createdAt,
    );
  }

  async findAll(): Promise<ConcessionEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent =>
      new ConcessionEntity(
        ent.id,
        ent.name,
        ent.managerUserId,
        ent.address,
        ent.createdAt,
      )
    );
  }

  async update(concession: ConcessionEntity): Promise<ConcessionEntity> {
    const entity = new ConcessionTypeORMEntity();
    entity.id = concession.id;
    entity.name = concession.name;
    entity.managerUserId = concession.managerUserId;
    entity.address = concession.address;
    entity.createdAt = concession.createdAt;

    await this.ormRepo.save(entity);
    return concession;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
