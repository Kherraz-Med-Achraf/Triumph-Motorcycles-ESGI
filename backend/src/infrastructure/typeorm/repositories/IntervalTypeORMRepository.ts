import { Repository } from "typeorm";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { IntervalEntity } from "../../../domain/entities/IntervalEntity";
import { IntervalTypeORMEntity } from "../entities/IntervalTypeORMEntity";

export class IntervalTypeORMRepository implements IntervalRepository {
  constructor(private ormRepo: Repository<IntervalTypeORMEntity>) {}

  async create(interval: IntervalEntity): Promise<IntervalEntity> {
    const entity = new IntervalTypeORMEntity();
    entity.id = interval.id;
    entity.type = interval.type;
    entity.value = interval.value;
    entity.motorcycleId = interval.motorcycleId;
    entity.createdAt = interval.createdAt;

    await this.ormRepo.save(entity);
    return interval;
  }

  async findById(id: string): Promise<IntervalEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new IntervalEntity(
      entity.id,
      entity.type as any, // "KM" ou "TIME"
      entity.value,
      entity.motorcycleId,
      entity.createdAt
    );
  }

  async findAll(): Promise<IntervalEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => new IntervalEntity(
      ent.id,
      ent.type as any,
      ent.value,
      ent.motorcycleId,
      ent.createdAt
    ));
  }

  async findAllByMotorcycle(motorcycleId: string): Promise<IntervalEntity[]> {
    const entities = await this.ormRepo.findBy({ motorcycleId });
    return entities.map(ent => new IntervalEntity(
      ent.id,
      ent.type as any,
      ent.value,
      ent.motorcycleId,
      ent.createdAt
    ));
  }

  async update(interval: IntervalEntity): Promise<IntervalEntity> {
    const entity = new IntervalTypeORMEntity();
    entity.id = interval.id;
    entity.type = interval.type;
    entity.value = interval.value;
    entity.motorcycleId = interval.motorcycleId;
    entity.createdAt = interval.createdAt;

    await this.ormRepo.save(entity);
    return interval;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
