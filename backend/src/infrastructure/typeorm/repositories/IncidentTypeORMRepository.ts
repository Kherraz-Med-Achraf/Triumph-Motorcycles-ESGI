import { Repository } from "typeorm";
import { IncidentRepository } from "../../../domain/repositories/IncidentRepository";
import { IncidentEntity } from "../../../domain/entities/IncidentEntity";
import { IncidentTypeORMEntity } from "../entities/IncidentTypeORMEntity";

export class IncidentTypeORMRepository implements IncidentRepository {
  constructor(private ormRepo: Repository<IncidentTypeORMEntity>) {}

  async create(incident: IncidentEntity): Promise<IncidentEntity> {
    const entity = new IncidentTypeORMEntity();
    entity.id = incident.id;
    entity.type = incident.type;
    entity.description = incident.description;
    entity.date = incident.date;
    entity.motorcycleId = incident.motorcycleId;
    entity.createdAt = incident.createdAt;

    await this.ormRepo.save(entity);
    return incident;
  }

  async findById(id: string): Promise<IncidentEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new IncidentEntity(
      entity.id,
      entity.type,
      entity.description,
      entity.date,
      entity.motorcycleId,
      entity.createdAt
    );
  }

  async findAll(): Promise<IncidentEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => new IncidentEntity(
      ent.id,
      ent.type,
      ent.description,
      ent.date,
      ent.motorcycleId,
      ent.createdAt
    ));
  }

  async findAllByMotorcycle(motorcycleId: string): Promise<IncidentEntity[]> {
    const entities = await this.ormRepo.findBy({ motorcycleId });
    return entities.map(ent => new IncidentEntity(
      ent.id,
      ent.type,
      ent.description,
      ent.date,
      ent.motorcycleId,
      ent.createdAt
    ));
  }

  async update(incident: IncidentEntity): Promise<IncidentEntity> {
    const entity = new IncidentTypeORMEntity();
    entity.id = incident.id;
    entity.type = incident.type;
    entity.description = incident.description;
    entity.date = incident.date;
    entity.motorcycleId = incident.motorcycleId;
    entity.createdAt = incident.createdAt;

    await this.ormRepo.save(entity);
    return incident;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
